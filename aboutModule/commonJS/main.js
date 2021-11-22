console.log('main.js 开始');
const a = require('./a.js');
const b = require('./b.js');
console.log('在main中，a.done', a.done);
console.log('在main中，b.done', b.done);

console.log('main.js 结束');