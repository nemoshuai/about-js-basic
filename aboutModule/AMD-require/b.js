define(['./a.js', 'exports'], function(a, exports) {
  console.log('b starting');
  exports.done = false;
  console.log('在b中， a.done为', a.done);
  exports.done = true;
  console.log('b 结束');
});