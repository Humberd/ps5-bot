import { SiteDef } from './site.def';
import { JSDOM } from 'jsdom';

export abstract class HtmlSiteDef extends SiteDef {
  protected async _internalTriggerChanges(): Promise<void> {
    const body = await this.getBodyFor(
      this.config.url,
      this.config.cookie,
      'html'
    );
    const dom = new JSDOM(body);

    const somethingChanged = this.hasUnexpectedChanges(dom.window.document);
    if (!somethingChanged) {
      this.logger.info(`Nothing changed...`);
    } else {
      this.logger.warn(`-----------------------------------`);
      this.logger.warn(`SOMETHING CHANGED!!!`);
      this.logger.warn(`-----------------------------------`);

      this.sendSuccessMail();
    }
  }

  protected abstract hasUnexpectedChanges(document: Document): boolean;
}
