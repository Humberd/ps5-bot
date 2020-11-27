import { ORDERED_NODE_SNAPSHOT_TYPE, SiteConfig, SiteDef } from '../site-def';

export class MediaExpertDef extends SiteDef{
  protected getConfig(): SiteConfig {
    return {
      name: 'Media Expert',
      url: 'https://www.mediaexpert.pl/gaming/playstation-5/konsole-ps5/konsola-sony-ps5'
    };
  }

  protected hasUnexpectedChanges(document: Document): boolean {
    return !this.hasKeyword(document) || !this.hasClassName(document)
  }

  private hasKeyword(document: Document): boolean {
    const phrase = 'niedostępny';

    // @ts-ignore
    const xPathResult = document.evaluate(
      `//*[normalize-space() = '${phrase}']`,
      document,
      null,
      ORDERED_NODE_SNAPSHOT_TYPE,
      null
    );

    return xPathResult.snapshotLength === 1;
  }

  private hasClassName(document: Document): boolean {
    return document.querySelectorAll('.c-availabilityNotification').length > 0;
  }

}
