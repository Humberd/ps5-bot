import { getLogger } from 'log4js';
import fetch from 'node-fetch';
import { SiteConfig } from './site-config';
import { MailSender } from '../mail-sender/mail-sender';

export abstract class SiteDef {
  protected config = this.getConfig();
  protected logger = getLogger(this.config.name);
  protected mailSender = new MailSender();

  private alreadySentMail = false;
  private alreadySentErrorMail = false;

  protected abstract getConfig(): SiteConfig;

  protected abstract _internalTriggerChanges(): Promise<void>;

  async triggerChanges(): Promise<void> {
    try {
      await this._internalTriggerChanges();

      // we are resetting after a success occurs, because there could be a temporary 400
      this.alreadySentErrorMail = false;
    } catch (e) {
      this.logger.error(e)
      if (!this.alreadySentErrorMail) {
        this.alreadySentErrorMail = true;
        this.mailSender.sendError(this.config.name, e);
      }
    }
  }

  protected async getBodyFor(
    url: string,
    cookie: string,
    type: 'json' | 'html'
  ): Promise<string> {
    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:83.0) Gecko/20100101 Firefox/83.0',
        Accept: type === 'html' ? 'text/html' : 'application/json',
        'Accept-Language': 'en-GB,en;q=0.5',
        Referer: 'https://www.google.com/',
        Pragma: 'no-cache',
        'Cache-Control': 'no-cache',
        'Accept-Encoding': 'gzip, deflate, br',
        Cookie: cookie ?? null,
      },
    });

    return await response.text();
  }

  protected sendSuccessMail(): void {
    if (!this.alreadySentMail) {
      this.alreadySentMail = true;
      this.mailSender.send(this.config.name);
    }
  }
}
