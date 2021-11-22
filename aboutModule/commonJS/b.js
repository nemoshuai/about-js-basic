console.log('b starting');
exports.done = false;
const a = require('./a.js');
console.log('在b中， a.done为', a.done);
exports.done = true;
console.log('b 结束');