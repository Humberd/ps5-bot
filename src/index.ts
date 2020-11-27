import { SiteDef } from './site-def';
import { MediaExpertDef } from './sites/media-expert.def';
import { configure } from 'log4js';

configure({
  appenders: { 'out': { type: 'stdout' } },
  categories: { default: { appenders: ['out'], level: 'info' } }
})

const sites: SiteDef[] = [
  // new MediaMarktDef(),
  new MediaExpertDef()
];

sites.forEach(site => {
  site.triggerChanges();
});
