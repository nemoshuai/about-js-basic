// 'use strict'
// 非严格模式下
// 全局 node环境下
// global.bar = 'bar1';

// function foo() {
//   const bar = 'bar';
//   console.log(this.bar);
// }

// let foo1 = { bar: 'bar2', foo };
// let foo2 = { bar: 'bar3', foo };

/**
 * 默认绑定
 * 输出结果：
 * bar1
 */
// foo();
/**
 * 隐式绑定
 * 输出结果：
 * bar2
 */
// foo1.foo();
/**
 * 隐式绑定
 * 输出结果：
 * bar3
 */
// foo2.foo();

// const obj = { bar: 'bar4' };
// foo1 = foo.bind(obj);
/**
 * 显式绑定
 * 输出结果：
 * bar4
 * bar4
 * bar4
 */
// foo.call(obj);
// foo.apply(obj);
// foo1();

// new绑定
// global.bar = 'bar1';

// function foo() {
//   this.baz = 'bar';
//   console.log('this.bar', this.bar);
// }

/**
 * 输出结果
 * this.bar undefined
 * baz foo { baz: 'bar' }
 */
// baz = new foo();
// console.log('baz', baz);

// 箭头函数
global.bar = 'bar';

/**
 * 
 * 输出结果
 * this Timeout
 * this.bar undefined
 */
function foo1() {
  this.bar = 'bar0';
  setTimeout(function() {
    console.log('this', this);
    console.log('this.bar', this.bar);
  }, 100);
}
a = new foo1();
console.log('a', a.bar);


/**
 * 输出结果
 * this foo { bar: 'bar0' }
 * this.bar bar0
 */
// function foo() {
//   this.bar = 'bar0';
//   setTimeout(() => {
//     console.log('this', this);
//     console.log('this.bar', this.bar);
//   }, 100);
// }
// b = new foo();
// console.log('b', b.bar);