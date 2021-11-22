define(['./a', './b'], function(a, b) {
  console.log('main.js 开始');
  console.log('在main中，a.done', a.done);
  console.log('在main中，b.done', b.done);
  console.log('main.js 结束');
});

