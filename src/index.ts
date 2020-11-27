import { SiteDef } from './framework/site.def';
import { configure } from 'log4js';
import { KomputronikDef } from './sites/komputronik.def';
import { MediaMarktDef } from './sites/media-markt.def';
import { NeonetDef } from './sites/neonet.def';
import { MediaExpertDef } from './sites/media-expert.def';
import { EuroDef } from './sites/euro.def';
import { EmpikDef } from './sites/empik.def';
import { AvansDef } from './sites/avans.def';

configure({
  appenders: { 'out': { type: 'stdout' } },
  categories: { default: { appenders: ['out'], level: 'info' } }
})

const sites: SiteDef[] = [
  new MediaMarktDef(),
  new MediaExpertDef(),
  new NeonetDef(),
  new EuroDef(),
  new EmpikDef(),
  new AvansDef(),
  new KomputronikDef()
];

sites.forEach(site => {
  site.triggerChanges();
});
