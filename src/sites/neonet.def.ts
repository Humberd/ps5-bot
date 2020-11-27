import { SiteConfig } from '../framework/site-config';
import { JsonSiteDef } from '../framework/json-site.def';

interface NeonetResponse {
  data: {
    landingPage: {
      name: string;
      modules: {
        id: number,
        position: number,
        type: string,
        parameters: string
      }[]
    }
  }
}

export class NeonetDef extends JsonSiteDef<NeonetResponse> {
  protected getConfig(): SiteConfig {
    return {
      name: 'Neonet',
      url: 'https://www.neonet.pl/graphql?query=query%20landingPageResolver($id:%20Int!)%20%7B%20landingPage:%20landingPageResolver(id:%20$id)%20%7B%20name%20custom_css%20teaser_alt%20teaser_file%20teaser_file_mobile%20show_teaser%20date_from%20clock_type%20modules%20%7B%20id%20position%20type%20parameters%20%7D%20is_outdated%20%7D%0A%7D%0A&variables=%7B%22id%22:1451%7D&v=2.54.0'
    };
  }

  protected hasUnexpectedChanges(json: NeonetResponse): boolean {
    return !this.hasProperTitle(json) || !this.hasThankYouModule(json);
  }

  private hasProperTitle(json: NeonetResponse): boolean {
    return json.data.landingPage.name === 'Premiera Konsoli Playstation 5';
  }

  private hasThankYouModule(json: NeonetResponse): boolean {
    const module = json.data.landingPage.modules[4];
    if (!module) {
      return false;
    }

    /**
     * Cannot check all the message, because from the backend we get encoded
     */
    const lastPartOfMessage = 'w celu uzyskania dalszych aktualizacji.'

    return module.id === 7201 && module.parameters.includes(lastPartOfMessage);
  }

}
