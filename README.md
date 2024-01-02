<h1 align="center">js-sieve</h1>
<p align="center">
    <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/license-MIT-_red.svg"></a>
</p>

This is a modern cache implementation, **inspired** by the [SIEVE is Simpler than LRU: an Efficient Turn-Key Eviction Algorithm for Web Caches](https://junchengyang.com/publication/nsdi24-SIEVE.pdf) (NSDI'24) paper. It offers state-of-the-art efficiency and scalability compared to other LRU-based cache algorithms.

<sub><sup>Based on the [Go](https://github.com/scalalang2/golang-fifo) implementation (JS implementation is without mutex). All credits to @scalalang2.</sup></sub>

## Basic Usage
```ts
import { Sieve } from 'js-sieve';

const cache = new Sieve<string, string>(1000);
cache.set("hello", "world")
const [v, _] = cache.get("hello");
console.log(v) // => "world"
```

## Benchmark
The benchmark result were obtained using [go-cache-benchmark](https://github.com/scalalang2/go-cache-benchmark), all credits to [golang-fifo](https://github.com/scalalang2/golang-fifo):

```
itemSize=500000, workloads=7500000, cacheSize=0.10%, zipf's alpha=0.99, concurrency=16

      CACHE      | HITRATE | MEMORY  |   QPS   |  HITS   | MISSES
-----------------+---------+---------+---------+---------+----------
  sieve          | 47.66%  | 0.09MiB | 2508361 | 3574212 | 3925788
  tinylfu        | 47.37%  | 0.11MiB | 2269542 | 3552921 | 3947079
  s3-fifo        | 47.17%  | 0.18MiB | 1651619 | 3538121 | 3961879
  slru           | 46.49%  | 0.11MiB | 2201350 | 3486476 | 4013524
  s4lru          | 46.09%  | 0.12MiB | 2484266 | 3456682 | 4043318
  two-queue      | 45.49%  | 0.17MiB | 1713502 | 3411800 | 4088200
  clock          | 37.34%  | 0.10MiB | 2370417 | 2800750 | 4699250
  lru-groupcache | 36.59%  | 0.11MiB | 2206841 | 2743894 | 4756106
  lru-hashicorp  | 36.57%  | 0.08MiB | 2055358 | 2743000 | 4757000
```

**For additional info about SIEVE**, head to [golang-fifo](https://github.com/scalalang2/golang-fifo). You'll find explanations why SIEVE is so good, why you should use it instead of FIFO/LRU, and things to consider before using it.

## Contribution
How to run tests
```bash
$ npx esno test/index.mts
```

How to run benchmark test
```bash
$ npx esno bench/index.mts
```
