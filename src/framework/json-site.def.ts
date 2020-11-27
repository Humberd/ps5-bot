import { SiteDef } from './site.def';

export abstract class JsonSiteDef<ResponseType> extends SiteDef {
  protected async _internalTriggerChanges(): Promise<void> {
    const body = await this.getBodyFor(this.config.url, this.config.cookie, 'json');

    const somethingChanged = this.hasUnexpectedChanges(JSON.parse(body))
    if (!somethingChanged) {
      this.logger.info(`Nothing changed...`);
    } else {
      this.logger.warn(`-----------------------------------`);
      this.logger.warn(`SOMETHING CHANGED!!!`);
      this.logger.warn(`-----------------------------------`);

      this.sendSuccessMail();
    }
  }

  protected abstract hasUnexpectedChanges(jsonObj: ResponseType): boolean;
}
