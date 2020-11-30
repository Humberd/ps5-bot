require('dotenv').config();

import { XKomDef } from './sites/x-kom.def';
import { MoreleNetDef } from './sites/morele-net.def';
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
  appenders: { out: { type: 'stdout' } },
  categories: { default: { appenders: ['out'], level: 'info' } },
});

// 5 minutes
const TIMEOUT = 5 * 60 * 1000;

const sites: SiteDef[] = [
  new MediaMarktDef(),
  new MediaExpertDef(),
  new NeonetDef(),
  new EuroDef(),
  new EmpikDef(),
  new AvansDef(),
  new KomputronikDef(),
  new XKomDef(),
  new MoreleNetDef(),
];

function sleep(timer: number): Promise<void> {
  return new Promise<void>((resolve) => setTimeout(() => resolve(), timer));
}

async function main() {
  while (true) {
    for (const site of sites) {
      await site.triggerChanges();
    }

    console.log('------------- SLEEPING -------------');
    await sleep(TIMEOUT);
  }
}

main();
