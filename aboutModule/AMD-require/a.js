define(['./b', 'exports'], function(b, exports) {
  console.log('a starting');
  exports.done = false;
  console.log('在a中， b.done为', b.done);
  exports.done = true;
  console.log('a 结束');
});