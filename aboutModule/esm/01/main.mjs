console.log('main.js 开始');
import a from './a.mjs';
import b from './b.mjs';
console.log('在main中，a.done', a.done);
console.log('在main中，b.done', b.done);

console.log('main.js 结束');

// node --experimental-modules main.mjs