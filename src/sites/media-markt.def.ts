import { ORDERED_NODE_SNAPSHOT_TYPE, SiteConfig, SiteDef } from '../site-def';

export class MediaMarktDef extends SiteDef {
  protected getConfig(): SiteConfig {
    return {
      name: 'Media Markt',
      url: 'https://mediamarkt.pl/playstation-5',
      cookie:
        'ak_bmsc=767747BA54A721E208A4F41F85F0A55D5F646F2F34540000F83DC15F77894D03~plhuSm6VnyvmG85vd+L+Qty+ZfYgCZv2f06FuMfmMq5hjYb7GdOCKXIl1mrLpusBHl9Sc13Uebd9WpVh4QBNctt5dILi6ehxXMXMY1nAOl70jxFB+iyWCcaClp6CBIlMOJcRAzuwNKHgsSPp5rP9IVq0rrTZ7TeeKyTFjKHEGsuEvTsmvm7m7+0rnC36fATOvad1UUZJL5S/xBz/4xmncAOu9uMQ3M0Wa+7WLLdyS8B+p95u4nSKlrMC3ypxWO8ivh; bm_mi=B28BEE6BC32C75EE8EAEA18977AB7417~ueyZGWppb/dMkM+SLSFFGSZO134gennUE+iFKpsFlcoT1b9BOwwb3e122Rw7qoixoGx12fRgEKQ8raqO8GNLUfmgwDHT9aNoJ3Pp+xDejfHFequtA47cUUYNw6aDo6Wwkzzky1GToRiTWx3V4yDnj6Lq4Wivh7x/POuGGh9XHal18KO9VnhCxhjDa8lmXFB/Ng+/w/kOwtNHspimIQhxUem74y1VFgalZ31kNjDv934kIRKFhYpXzCjCsxk56hYh; bm_sv=14B1F212F47D4EF4935687B2C36B8E11~QSRPOkYzE+LecI6bqPx2li3B6wn0hjQ1Cjau1qZLiN+l9BQzYRUhevE9W6vMfwj1qPqNLFhVa3FFq9zi1mp5Sh4la6BZSAPq8IYT+4pi5sK5q/jZOSombZrpgkk7dK3tnHMn3fxMAgU8AvaMH1ESEK63OZ6QbZaP7xdcGM98wMw=',
    };
  }

  protected hasUnexpectedChanges(document: Document): boolean {
    const phrase =
      'Dziękujemy wszystkim, którzy odwiedzili naszą stronę i złożyli zamówienie na konsolę PS5. Jeżeli nie miałeś możliwości dokonania zakupu, sprawdzaj naszą stronę Internetową w celu uzyskania dalszych aktualizacji.';

    // @ts-ignore
    const xPathResult = document.evaluate(
      `//*[normalize-space() = '${phrase}']`,
      document,
      null,
      ORDERED_NODE_SNAPSHOT_TYPE,
      null
    );

    return xPathResult.snapshotLength !== 1;
  }
}
