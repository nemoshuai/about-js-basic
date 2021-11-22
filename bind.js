// bind创建一个新函数，新函数的this被bind的第一参数指定，其他参数作为新函数的参数

const o = { name: 'hello' };

function fn1(a, b) {
  this.value = '123';
  console.log(this.name, this.value, a, b);
}

const fn2 = fn1.bind(o, '456');
const fn3 = fn1.bind(undefined, '456');

/**
 * 输出结果
 * hello 123 456 789
 */
fn2('789');
/**
 * 输出结果
 * undefined 123 456 789
 */
fn3('789');

Function.prototype._bind = function() {
  const thatFun = this; // this指向fn1
  if(typeof thatFun !== 'function') {
    // 判断fn1是不是函数
    throw new TypeError('must be a function');
  }
  
  // const that = arguments[0]; // bind传入的第一参数'o'
  // // 获取bind()剩下的参数，arguments是类数组 需要call调用
  // const args = Array.prototype.slice.call(arguments, 1);
  // es6写法
  const [that, ...args] = [...arguments];
  // 返回一个新创建的函数
  return function() {
    // 此处的argument是fn4的参数，将bind的其余参数和fn2的参数组合
    // const params = Array.prototype.concat.call(args, arguments);
    // es6写法
    const params = [...args, ...arguments];
    // fn1可能也有return数据，因此这里需要也return;
    return thatFun.apply(that, params);
  }
}

/**
 * 输出结果
 * hello 123 456 789
 */
const fn4 = fn1._bind(o, '456');

fn4('789');

// “bind() 函数会创建一个新绑定函数（bound function，BF）。
// 绑定函数也可以使用new运算符构造，提供的this值会被忽略，但前置参数仍会提供给模拟函数”
/**
 * 使用 "new"关键字 原生bind的表现
 * 提供this（o）会被忽略，this指向是newObj 但前置参数 a‘456'已经提供给函数, 原型指向了fn1，所以能访问到value
 * newObj的原型并没有指向fn2的原型
 * 绑定函数的原型也不是指向被绑定的函数
 */
const newObj = new fn2('789'); // 输出结果: undefined 123 456 789
console.log(newObj.value); // 输出结果： 123 
console.log(newObj.__proto__ === fn2.prototype); // 输出结果： false
console.log(newObj.__proto__ === fn1.prototype); // 输出结果： true
console.log(fn2.prototype); // undefined
/**
 * 使用 "new"关键字 _bind的表现
 * this的指向为o, 因此能访问到o的name, 但_bind的实现没有让newObj的原型链上有fn1,以至于无法访问到value属性
 */
const newObj = new fn4('789');  // 输出结果：hello 123 456 789
console.log(newObj.value); // 输出结果： undefined
console.log(newObj.__proto__ === fn4.prototype); // 输出结果： true
console.log(newObj.__proto__.__proto__ === fn1.prototype); // 输出结果： false
console.log(fn4.prototype); // 输出结果： {}


// 对_bind修改，使得newObj的原型链上有fn1，访问到fn1的属性
Function.prototype._bind1 = function() {
  const thatFun = this; // this指向fn1
  if(typeof thatFun !== 'function') {
    // 判断fn1是不是函数
    throw new TypeError('must be a function');
  }
  
  // const that = arguments[0]; // bind传入的第一参数'o'
  // // 获取bind()剩下的参数，arguments是类数组 需要call调用
  // const args = Array.prototype.slice.call(arguments, 1);
  // es6写法
  const [that, ...args] = [...arguments];

  const boundFn = function() {
    // 此处的argument是fn4的参数，将bind的其余参数和fn2的参数组合
    // const params = Array.prototype.concat.call(args, arguments);
    // es6写法
    const params = [...args, ...arguments];
    // fn1可能也有return数据，因此这里需要也return;
    /**
     * 如果用了new关键字，则this指向了newObj, fn4是boundFn,那么this instanceof boundFn会为true, 
     * 则this直接绑定到newObj 与原生bind保持一致
     * 若无new关键字，则this应该指向fn1
     **/ 
    return thatFun.apply(this instanceof boundFn ? this : that, params);
  }

  /**
   * fNOP是一个中间函数，防止boundFn.prototype的修改影响到thatFun.prototype
   * boundFn.prototype = thatFun.prototype  thatFun.prototype的地址赋给了boundFn.prototype
   * boundFn.prototype修改导致thatFun.prototype， boundFn的原型应该是fn1
   **/ 
  const fNOP = function() {};
  if (thatFun.prototype) {
    fNOP.prototype = thatFun.prototype; 
  }
  boundFn.prototype = new fNOP();
  return boundFn;
}

const fn4 = fn1._bind1(o, '456');
/**
 * 使用"new"关键字，_bind1的表现
 * this指向了newObjA,且原型链上有fn1 能访问到value
 */
const newObj = new fn4('789'); // 输出结果 undefined 123 456 789
console.log(newObj.value); // 输出结果： 123 
console.log(newObj.__proto__ === fn4.prototype); // 输出结果： true
console.log(newObj.__proto__.__proto__ === fn1.prototype); // 输出结果： true
console.log(fn4.prototype); // 输出结果: fn1 {}