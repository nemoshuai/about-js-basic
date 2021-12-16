class Worker {
  #privateA;
  // 构造函数
  constructor(name, id) {
    this.name = name;
    this.id = id;
    this.sayThis = this.sayThis.bind(this);
    this.#privateA = '私有变量';
  }

  static data = '静态属性';

  job = 'worker'; // 与位置无关，跟在构造函数定义是一样的
  
  say() {
    console.log('I am Worker', this.name);
  }
  sayThis() {
    console.log('I am Worker', this.name);
  }
  sayArrow = () => {
    console.log('I am Worker', this.name);
  }
  static staticMethod() { //静态方法
    console.log(`这是静态方法`);
  }
}

// 等同于

// Worker.prototype = {
//   constructor() {},
//   say() {},
//   sayThis() {},
//   sayArrow() {},
//   ...
// };

/* class 是语法糖 角色是构造函数‘
 * 输出结果
 * true
 */
// console.log(Worker === Worker.prototype.constructor);

/**
 * 输出结果
 * Ben worker
 * Worker {} undefined undefined
 */
const worker0 = new Worker('Ben', '113');

// console.log(worker0.name, worker0.job);
// console.log(worker0.__proto__, worker0.__proto__.name, worker0.__proto__.job);

/* 实例的构造函数指向原型对象的构造函数
 * 输出结果
 * true
 */
// console.log(worker0.constructor === Worker.prototype.constructor);

/**
 * 可能会出现this指向为空的情况，定义方法建议箭头函数
 * 输出结果
 * I am Worker Ben
 * I am Worker Ben
 * I am Worker Ben
 */
// worker0.say();
// worker0.sayThis();
// worker0.sayArrow();

// 实例不会继承静态方法 通过类直接调用
// TypeError: worker0.staticMethod is not a function
// worker0.staticMethod();
/*
 * 输出结果
 * 这是静态方法
 */
// Worker.staticMethod();

/**
 * 输出结果
 * undefined 静态属性
 */
// console.log(worker0.data, Worker.data);


class SubWorker extends Worker {
  static staticMethod = () => {
    super.staticMethod();
  }
}

/**
 * 输出结果
 * 这是静态方法
 */
// SubWorker.staticMethod();

/**
 * 输出结果
 * I am Worker Lucas
 */
const subWorker1 = new SubWorker('Lucas', '111');
subWorker1.say();