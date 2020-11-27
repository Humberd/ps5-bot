import { HtmlSiteDef } from '../framework/html-site.def';
import { SiteConfig } from '../framework/site-config';
import { ORDERED_NODE_SNAPSHOT_TYPE } from '../framework/constants';

export class KomputronikDef extends HtmlSiteDef{
  protected getConfig(): SiteConfig {
    return {
      name: 'Komputronik',
      url: 'https://www.komputronik.pl/product/701046/sony-playstation-5.html'
    };
  }

  protected hasUnexpectedChanges(document: Document): boolean {
    const phrase =
      'Produkt tymczasowo niedostępny.';

    // @ts-ignore
    const xPathResult = document.evaluate(
      `//*[normalize-space() = '${phrase}']`,
      document,
      null,
      ORDERED_NODE_SNAPSHOT_TYPE,
      null
    );

    return xPathResult.snapshotLength === 0;
  }

}
