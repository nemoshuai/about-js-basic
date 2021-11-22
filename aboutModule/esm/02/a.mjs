console.log('a start');
export default function() {
  return '运行A';
}

import b from './b.mjs';
console.log('在a中', b());

console.log('a end');