import { HtmlSiteDef } from '../framework/html-site.def';
import { SiteConfig } from '../framework/site-config';

export class EuroDef extends HtmlSiteDef {
  protected getConfig(): SiteConfig {
    return {
      name: 'Euro',
      url: 'https://www.euro.com.pl/web-cached/product-detail/selling-section.ltr?productId=60210931385'
    };
  }


  protected hasUnexpectedChanges(document: Document): boolean {
    return document.querySelectorAll('.temporary-unavailable').length !== 1;
  }

}
