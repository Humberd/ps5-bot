import { SiteDef } from './framework/site.def';
import { configure } from 'log4js';
import { AvansDef } from './sites/avans.def';

configure({
  appenders: { 'out': { type: 'stdout' } },
  categories: { default: { appenders: ['out'], level: 'info' } }
})

const sites: SiteDef[] = [
  // new MediaMarktDef(),
  // new MediaExpertDef(),
  // new NeonetDef(),
  // new EuroDef(),
  // new EmpikDef(),
  new AvansDef()
];

sites.forEach(site => {
  site.triggerChanges();
});
