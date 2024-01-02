import { Bench } from 'tinybench';
import { Sieve as Sieve1 } from '../sieve.mts'
//import { Sieve as Sieve2 } from '../alt-impl/list2'
import { Sieve as SieveMap } from '../alt-impl/map.mts'
import { Sieve as SieveArr } from '../alt-impl/map2.mts'

const list = new Sieve1<string, string>(100)
//const list2 = new Sieve2(100)
const map = new SieveMap<string, string>(100)
const map2 = new SieveMap<string, string>(100)

for (let i = 0; i < 100; ++i) {
  const k = `a${i}`, v = `${i}`
  list.set(k,v)
  //list2.set(k,v)
  map.set(k,v)
  map2.set(k,v)
}

const bench = new Bench({ time: 100 });

bench
  .add('@js-sdsl/link-list', () => {
    list.get('a50')
    list.set('a200', 'str')
    list.set('a201', 'str1')
    list.get('a201')
  })
  /*.add('fast-linked-list', () => {
    list2.get('a50')
    list2.set('a200', 'str')
    list2.set('a201', 'str1')
    list2.get('a201', 'str1')
  })*/
  .add('map', () => {
    map.get('a50')
    map.set('a200', 'str')
    map.set('a201', 'str1')
    map.get('a201')
  })
  .add('map2', () => {
    map2.get('a50')
    map2.set('a200', 'str')
    map2.set('a201', 'str1')
    map2.get('a201')
  })
await bench.warmup();
await bench.run();

console.table(bench.table());
/*
┌─────────┬──────────────────────┬──────────────┬────────────────────┬──────────┬─────────┐
│ (index) │ Task Name            │ ops/sec      │ Average Time (ns)  │ Margin   │ Samples │
├─────────┼──────────────────────┼──────────────┼────────────────────┼──────────┼─────────┤
│ 0       │ '@js-sdsl/link-list' │ '10.367.089' │ 96.45908350368484  │ '±0.67%' │ 1036709 │
│ 1       │ 'map'                │ '9.281.080'  │ 107.74607292892392 │ '±0.15%' │ 928109  │
│ 2       │ 'map2'               │ '9.370.039'  │ 106.72313031750762 │ '±0.24%' │ 937004  │
└─────────┴──────────────────────┴──────────────┴────────────────────┴──────────┴─────────┘
*/
