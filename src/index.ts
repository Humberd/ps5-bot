import { SiteDef } from './site-def';
import { MediaMarktDef } from './sites/media-markt-def';

const sites: SiteDef[] = [
  new MediaMarktDef()
];

sites.forEach(site => {
  site.triggerChanges();
});
