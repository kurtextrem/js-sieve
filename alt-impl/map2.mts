export class Sieve<K, V> {
	private size: number;
	private items: Map<K, V>;
	private order: K[];

	constructor(size: number) {
			this.size = size;
			this.items = new Map<K, V>();
			this.order = [];
	}

	set(key: K, value: V): void {
			if (this.items.has(key)) {
					this.items.set(key, value);
					this.updateOrder(key);
			} else {
					if (this.order.length >= this.size) {
							this.evict();
					}
					this.items.set(key, value);
					this.order.push(key);
			}
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
			this.items = new Map<K, V>();
			this.order = [];
	}

	private evict(): void {
			const key = this.order.shift();
			if (key !== undefined) {
					this.items.delete(key);
			}
	}

	private updateOrder(key: K): void {
			const index = this.order.indexOf(key);
			if (index !== -1) {
					this.order.splice(index, 1);
					this.order.push(key);
			}
	}
}
