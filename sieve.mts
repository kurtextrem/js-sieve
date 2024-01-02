import { LinkList, LinkListIterator } from '@js-sdsl/link-list';

export class Entry<K, V> {
    constructor(public key: K, public value: V, public visited: boolean = false) {}
}

export class Sieve<K, V> {
    private size: number;
    private items: Map<K, Entry<K, V>>;
    private ll: LinkList<Entry<K, V>>;
    private hand: LinkListIterator<Entry<K, V>> | undefined;

    constructor(size: number) {
        this.size = size;
        this.items = new Map<K, Entry<K, V>>();
        this.ll = new LinkList<Entry<K, V>>();
    }

    set(key: K, value: V): void {
        if (this.items.has(key)) {
            const e = this.items.get(key);
            if (e) {
                e.value = value;
                e.visited = true;
            }
            return;
        }

        if (this.ll.length >= this.size) {
            this.evict();
        }

        const e = new Entry<K, V>(key, value);
        this.items.set(key, e);
        this.ll.pushFront(e);
    }

    get(key: K): [V | null, boolean] {
        if (this.items.has(key)) {
            const e = this.items.get(key);
            if (e) {
                e.visited = true;
                return [e.value, true];
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
                return [e.value, true];
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
        if (!this.hand) {
            this.hand = this.ll.rBegin(); // start on tail
        }

        let i: Entry<K, V>;
        while (this.hand.isAccessible() && (i = this.hand.pointer) && i.visited) {
            i.visited = false;

            this.hand.next(); // as we use `rBegin`, this is actually the prev node
            if (!this.hand.isAccessible()) {
                this.hand = this.ll.rBegin();
            }
        }

        const hand = this.hand;
        if (hand.isAccessible()) {
            this.items.delete(hand.pointer.key);
            this.ll.eraseElementByIterator(hand);
            return;
        }
        this.hand = undefined;
    }
}
