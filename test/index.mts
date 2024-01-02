import { Sieve  } from '../list.mts'

const list = new Sieve<string, string>(2)
list.set('a', 'a')
list.set('b', 'b')
list.set('c', 'c')
console.log(list.len() === 2)
console.log(list.contains('b'))
console.log(list.contains('c'))
console.log(!list.contains('a')) // FIFO

list.get('b') // visit
list.set('a', 'a')
console.log(list.len() === 2)
console.log(list.contains('b'))
console.log(!list.contains('c')) // no longer FIFO because of the visit
console.log(list.contains('a'))
