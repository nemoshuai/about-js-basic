console.log('b start');
export default function() {
  return 'run b';
}

import a from './a.mjs';
console.log('在b中，a', a());
console.log('b end');
