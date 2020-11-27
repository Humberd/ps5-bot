import { SiteDef } from './framework/site.def';
import { configure } from 'log4js';
import { EmpikDef } from './sites/empik.def';

configure({
  appenders: { 'out': { type: 'stdout' } },
  categories: { default: { appenders: ['out'], level: 'info' } }
})

const sites: SiteDef[] = [
  // new MediaMarktDef(),
  // new MediaExpertDef(),
  // new NeonetDef(),
  // new EuroDef(),
  new EmpikDef()
];

sites.forEach(site => {
  site.triggerChanges();
});
