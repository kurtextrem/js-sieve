import { strictEqual } from "assert";
import { Sieve } from "../sieve.mts";

let sieve = new Sieve<string, string>(2);
sieve.set("a", "a");
sieve.set("b", "b");
sieve.set("c", "c");
strictEqual(sieve.len(), 2);
strictEqual(sieve.contains("b"), true);
strictEqual(sieve.contains("c"), true);
// FIFO
strictEqual(sieve.contains("a"), false);

// visit
sieve.get("b");
sieve.set("a", "a");
strictEqual(sieve.len(), 2);
strictEqual(sieve.contains("b"), true);
// no longer FIFO because of the visit
strictEqual(sieve.contains("c"), false);
strictEqual(sieve.contains("a"), true);

sieve = new Sieve<string, string>(2);
sieve.set("a", "a");
sieve.get("a");
sieve.set("c", "c");
sieve.set("b", "b");
sieve.set("c", "c");
strictEqual(sieve.len(), 2);
