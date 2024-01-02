class Sieve<K, V> {
    private size: number;
    private items: Map<K, V>;
    private order: Map<K, number>;
    private counter: number;

    constructor(size: number) {
        this.size = size;
        this.items = new Map<K, V>();
        this.order = new Map<K, number>();
        this.counter = 0;
    }

    set(key: K, value: V): void {
        if (this.items.has(key)) {
            this.items.set(key, value);
            this.updateOrder(key);
            return;
        }
        if (this.items.size >= this.size) {
            this.evict();
        }
        this.items.set(key, value);
        this.order.set(key, this.counter++);
    }

    get(key: K): V | undefined {
        if (this.items.has(key)) {
            this.updateOrder(key);
        }
        return this.items.get(key);
    }

    contains(key: K): boolean {
        return this.items.has(key);
    }

    peek(key: K): V | undefined {
        return this.items.get(key);
    }

    len(): number {
        return this.items.size;
    }

    clean(): void {
        this.items.clear()
        this.order.clear()
        this.counter = 0;
    }

    private evict(): void {
        let leastRecentlyUsedKey: K | null = null;
        let leastRecentlyUsedTime = Infinity;

        for (const [key, time] of this.order) {
            if (time < leastRecentlyUsedTime) {
                leastRecentlyUsedKey = key;
                leastRecentlyUsedTime = time;
            }
        }

        if (leastRecentlyUsedKey !== null) {
            this.items.delete(leastRecentlyUsedKey);
            this.order.delete(leastRecentlyUsedKey);
        }
    }

    private updateOrder(key: K): void {
        this.order.set(key, this.counter++);
    }
}

export { Sieve }
