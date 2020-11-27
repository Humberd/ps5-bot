import { HtmlSiteDef } from '../framework/html-site.def';
import { SiteConfig } from '../framework/site-config';
import { ORDERED_NODE_SNAPSHOT_TYPE } from '../framework/constants';

export class EmpikDef extends HtmlSiteDef {
  protected getConfig(): SiteConfig {
    return {
      name: 'Empik',
      url: 'https://www.empik.com/gry-i-programy/playstation-5'
    };
  }

  protected hasUnexpectedChanges(document: Document): boolean {
    const phrase = 'Nakład konsol został wyczerpany Pozostałe produkty dostępne tylko online';

    // @ts-ignore
    const xPathResult = document.evaluate(
      `/html/body/main/div[1]/p/span/strong[normalize-space() = '${phrase}']`,
      document,
      null,
      ORDERED_NODE_SNAPSHOT_TYPE,
      null
    );

    return xPathResult.snapshotLength !== 1;
  }

}
