import { HtmlSiteDef } from '../framework/html-site.def';
import { SiteConfig } from '../framework/site-config';
import { ORDERED_NODE_SNAPSHOT_TYPE } from '../framework/constants';

export class XKomDef extends HtmlSiteDef {
  protected getConfig(): SiteConfig {
    return {
      name: 'X-kom',
      url:
        'https://www.x-kom.pl/p/577878-konsola-playstation-sony-playstation-5.html',
    };
  }

  protected hasUnexpectedChanges(document: Document): boolean {
    const phrase = 'Wycofany';

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
