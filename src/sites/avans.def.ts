import { HtmlSiteDef } from '../framework/html-site.def';
import { SiteConfig } from '../framework/site-config';
import { ORDERED_NODE_SNAPSHOT_TYPE } from '../framework/constants';

export class AvansDef extends HtmlSiteDef {
  protected getConfig(): SiteConfig {
    return {
      name: 'Avans',
      url: 'https://www.avans.pl/konsole-i-gry/playstation-5/konsole-ps5'
    };
  }

  protected hasUnexpectedChanges(document: Document): boolean {
    const phrase =
      'Nie znaleziono produktów spełniających wybrane kryteria. Usuń część filtrów, aby zobaczyć listę produktów.';

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
