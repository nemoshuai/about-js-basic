console.log('b start');
export default {
  done: true,
};

import a from './a.mjs';
console.log('在b中，a.done', a.done);

console.log('b end');
