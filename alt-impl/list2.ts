import { LengthLinkedList, LengthToken, Token } from 'fast-linked-list';

class Entry<K, V> {
    constructor(public key: K, public value: V, public visited: boolean = false) {}
}

class Sieve<K, V> {
    private size: number;
    private items: Map<K, LengthToken<Entry<K, V>>>;
    private ll: LengthLinkedList<Entry<K, V>>;
    private hand: Token<Entry<K, V>> | null | undefined;

    constructor(size: number) {
        this.size = size;
        this.items = new Map<K, LengthToken<Entry<K, V>>>();
        this.ll = new LengthLinkedList<Entry<K, V>>();
    }

    set(key: K, value: V): void {
        if (this.items.has(key)) {
            const e = this.items.get(key);
            if (e) {
                e.value.value = value;
                e.value.visited = true;
            }
            return;
        }

        if (this.ll.length >= this.size) {
            this.evict();
        }

        const e = new Entry<K, V>(key, value);
        this.items.set(key, this.ll.unshift(e));
    }

    get(key: K): [V | null, boolean] {
        if (this.items.has(key)) {
            const e = this.items.get(key);
            if (e) {
                e.value.visited = true;
                return [e.value.value, true];
            }
        }

        return [null, false];
    }

    contains(key: K): boolean {
        return this.items.has(key);
    }

    peek(key: K): [V | null, boolean] {
        if (this.items.has(key)) {
            const e = this.items.get(key);
            if (e) {
                return [e.value.value, true];
            }
        }

        return [null, false];
    }

    len(): number {
        // todo: probably worth using a counter somewhere, or look up if it's efficient in the list impl
        return this.ll.length;
    }

    purge(): void {
        this.items.clear();
        this.ll.clear();
    }

    private evict(): void {
        let o = this.hand;

        this.ll.reverse().forEach((e) => {
            console.log(e) // "x", "a", "b"
        })

        if (o === null) {
            o = this.ll.last;
        }

        while (o && o.value.visited) {
            o.value.visited = false;
            o = o.prev;
            if (o === null) {
                o = this.ll.last;
            }
        }

        this.hand = o ? o.prev : null;
        if (o) {
            this.items.delete(o.value.key);
            o.remove()
        }
    }
}

export { Sieve }
