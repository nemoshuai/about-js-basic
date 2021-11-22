console.log('a start');
export default {
  done: true,
};

import b from './b.mjs';
console.log('在a中，b.done', b.done);

console.log('a end');