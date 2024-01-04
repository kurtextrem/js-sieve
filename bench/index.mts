import { Bench } from 'tinybench';
import { Sieve as Sieve1 } from '../sieve.mts'
//import { Sieve as Sieve2 } from '../alt-impl/list2'
import { Sieve as SieveMap } from '../alt-impl/map.mts'
import { Sieve as SieveArr } from '../alt-impl/map2.mts'
import { LRUCache } from '../alt-impl/lru.mts'
import { LRUCache as Cache2 } from '../alt-impl/lru3.mts'
import { SieveCache } from '../alt-impl/lru2.mts'

const N = 100000
const list = new Sieve1<string, string>(N)
//const list2 = new Sieve2(N)
const map = new SieveMap<string, string>(N)
const arr = new SieveArr<string, string>(N)
const mnemoist = new LRUCache(N, N, N)
const sieve = new SieveCache(N, N, N)
const cache = new Cache2(N, N, N)

for (let i = 0; i < N; ++i) {
  const k = `a${i}`, v = `${i}`
  list.set(k,v)
  //list2.set(k,v)
  map.set(k,v)
  arr.set(k,v)
  mnemoist.set(k,v)
  sieve.set(k,v)
  cache.set(k,v)
}

const bench = new Bench({ time: 100 });

// each bench reads from exactly the middle
// then appends somethingg to make it overflow (and thus evict)
// then reads at the end the newly inserted value
// and gets it again
bench
  .add('@js-sdsl/link-list', () => {
    list.get(`a${N/2}`)
    list.set(`a${N+2}`, 'str')
    list.set(`a${N+1}`, 'str1')
    list.get(`a${N+1}`)
  }, { afterAll: () => list.clear() })
  .add('map', () => {
    map.get(`a${N/2}`)
    map.set(`a${N+2}`, 'str')
    map.set(`a${N+1}`, 'str1')
    map.get(`a${N+1}`)
  }, { afterAll: () => map.clean() })
  .add('arr', () => {
    arr.get(`a${N/2}`)
    arr.set(`a${N+2}`, 'str')
    arr.set(`a${N+1}`, 'str1')
    arr.get(`a${N+1}`)
  }, { afterAll: () => arr.clean() })
  .add('mnemoist', () => {
    mnemoist.get(`a${N/2}`)
    mnemoist.set(`a${N+2}`, 'str')
    mnemoist.set(`a${N+1}`, 'str1')
    mnemoist.get(`a${N+1}`)
  }, { afterAll: () => mnemoist.clear() })
  .add('mnemoist-set', () => {
    sieve.get(`a${N/2}`)
    sieve.set(`a${N+2}`, 'str')
    sieve.set(`a${N+1}`, 'str1')
    sieve.get(`a${N+1}`)
  }, { afterAll: () => sieve.clear() })
  .add('mnemoist-obj-opt', () => {
    cache.get(`a${N/2}`)
    cache.set(`a${N+2}`, 'str')
    cache.set(`a${N+1}`, 'str1')
    cache.get(`a${N+1}`)
  }, { afterAll: () => cache.clear() })
await bench.warmup();
await bench.run();

console.table(bench.table());
/*
┌─────────┬──────────────────────┬─────────────┬────────────────────┬──────────┬─────────┐
│ (index) │ Task Name            │ ops/sec     │ Average Time (ns)  │ Margin   │ Samples │
├─────────┼──────────────────────┼─────────────┼────────────────────┼──────────┼─────────┤
│ 0       │ '@js-sdsl/link-list' │ '4.149.471' │ 240.9945342548742  │ '±0.72%' │ 414948  │
│ 1       │ 'map'                │ '3.898.902' │ 256.48245278806286 │ '±0.69%' │ 389891  │
│ 2       │ 'arr'                │ '2.491.129' │ 401.42425325064335 │ '±0.89%' │ 249113  │
│ 3       │ 'mnemoist'           │ '3.038.699' │ 329.08809688353944 │ '±0.34%' │ 303870  │
│ 4       │ 'mnemoist-set'       │ '4.690.230' │ 213.2091321552225  │ '±0.69%' │ 469024  │
│ 5       │ 'mnemoist-obj-opt'   │ '3.074.333' │ 325.27371728572916 │ '±0.57%' │ 307434  │
└─────────┴──────────────────────┴─────────────┴────────────────────┴──────────┴─────────┘
*/
