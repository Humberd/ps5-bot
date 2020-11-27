import { getLogger } from 'log4js';
import fetch from 'node-fetch';
import { SiteConfig } from './site-config';

export abstract class SiteDef {
  protected config = this.getConfig();
  protected logger = getLogger(this.config.name)

  protected abstract getConfig(): SiteConfig;

  abstract triggerChanges(): Promise<void>;

  protected async getBodyFor(url: string, cookie: string, type: 'json' | 'html'): Promise<string> {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:83.0) Gecko/20100101 Firefox/83.0',
        'Accept': type === 'html' ? 'text/html': 'application/json',
        'Accept-Language': 'en-GB,en;q=0.5',
        'Referer': 'https://www.google.com/',
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache',
        'Accept-Encoding': 'gzip, deflate, br',
        'Cookie': cookie ?? null
      }
    });

    return await response.text();
  }
}
