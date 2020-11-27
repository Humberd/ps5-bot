import { JSDOM } from 'jsdom';
import fetch from 'node-fetch';

export interface SiteConfig {
  name: string;
  url: string;
  cookie?: string;
}

export const ORDERED_NODE_SNAPSHOT_TYPE = 7;

export abstract class SiteDef {
  protected abstract getConfig(): SiteConfig;

  protected abstract hasUnexpectedChanges(document: Document): boolean;

  async triggerChanges(): Promise<void> {
    const config = this.getConfig();

    const body = await this.getBodyFor(config.url, config.cookie);

    const dom = new JSDOM(body);

    const document = dom.window.document;

    this.hasUnexpectedChanges(dom.window.document)

    console.log(document);
  }

  private async getBodyFor(url: string, cookie: string): Promise<string> {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:83.0) Gecko/20100101 Firefox/83.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-GB,en;q=0.5',
        'Referer': 'https://www.google.com/',
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache',
        'Accept-Encoding': 'gzip, deflate, br',
        'Cookie': cookie ?? null
      }
    });

    const body = await response.text();

    return body;
  }
}
