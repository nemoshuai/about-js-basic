const scope = 'global';

function fun1() {
  const scope = 'local';
  return function() {
    return scope;
  }
}

const fun2 = fun1();
/**
 * 输出结果
 * local
 */
console.log(fun2());

// const data = [];
// for(var i = 0; i < 3; i++) {
// 	data[i] = function() {
//     console.log(i);
//   }
// }
/**
 * var i = 0 变量提升，
 * data[i]函数本身没有i，随着作用域链找到全局作用域的i,输出3
 * 输出结果
 * 3
 * 3
 * 3
 */
// data[0]()
// data[1]()
// data[2]()

// const data = [];
// for(var i = 0; i < 3; i++) {
//   // 立即执行函数
// 	data[i] = (function(i) {
//     return function() {
//       console.log(i);
//     }
//   })(i);
// }

/**
 * data[i]的作用域保存着匿名函数的作用域，作用域链向上查找，在匿名函数的上下文中找到i
 * 输出结果
 * 0
 * 1
 * 2
 */
// data[0]()
// data[1]()
// data[2]()


const data = [];
// 通过'let'声明了块级作用域，内部函数data[i]形成了闭包, 并且引用着块级作用域，所以拥有变量i,
// 输出是输出了块级作用域的i
for(let i = 0; i < 3; i++) {
  data[i] = function() {
    console.log(i);
  }
}

/**
 * 输出结果
 * 0
 * 1
 * 2
 */
data[0]();
data[1]();
data[2]();

