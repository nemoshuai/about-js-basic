// 构造函数
function Worker(name, id) {
  this.name = name;
  this.id = id;
}

Worker.prototype = {
  // constructor: Worker, // 原型对象有个参数constructor 指向构造函数 Worker
  // 所有实例共有
  job: 'worker',
  species: 'human', 
  character: ['hard', 'honest', 'brave'],
  part: ['head', 'face', 'norse'],
  say() {
    console.log('I am Worker');
  }
}

/**
 * 输出结果
 * Worker.prototype.__proto__ {}
 */
console.log('Worker.prototype.__proto__', Worker.prototype.__proto__);

// 创建实例 worker0 和 worker1 的__proto__ 指向Worker.prototype 
const worker0 = new Worker('Eden', '110');
const worker1 = new Worker('Lucas', '111');

/**
 * 输出结果
 * worker Worker { name: 'Eden', id: '110' } Worker { name: 'Lucas', id: '111' }
 */
console.log('worker', worker0, worker1);

/**
 * 输出结果 worker0 和 worker1 的__proto__都指向Worker.prototype 
 * worker proto Worker {
  constructor: [Function: Worker],
  job: 'worker',
  species: 'human',
  character: [ 'hard', 'honest', 'brave' ],
  say: [Function: say]
} Worker {
  constructor: [Function: Worker],
  job: 'worker',
  species: 'human',
  character: [ 'hard', 'honest', 'brave' ],
  say: [Function: say]
}
 */
console.log('worker proto', worker0.__proto__, worker1.__proto__);


/**
 * 实例中并不存在job属性，沿原型链向上查找, 输出worker0.job 实际上是输出 Worker.prototype.job
 * 输出结果 返回
 * worker worker worker
 */
console.log(worker0.job, worker1.job, Worker.prototype.job);


/**
 * 实例自身添加属性job，则直接输出worker0.job, 原型上的job属性不受影响 worker0.__proto__.job 相当于 Worker.prototype.job
 * 输出结果 返回
 * teacher worker worker
 */
worker0.job = 'teacher';
console.log(worker0.job, worker1.job, worker0.__proto__.job);

/**
 * character属性是引用类型, 若只更改其中的属性 Worker.prototype.character 会受影响
 * part属性是引用类型， 直接赋值  Worker.prototype.part 不会受影响
 * 输出结果
 * [ 'interesting', 'honest', 'brave' ] [ 'mouse', 'eyes' ]
 * [ 'interesting', 'honest', 'brave' ] [ 'head', 'face', 'norse' ]
 */
 worker0.character[0] = 'interesting';
 worker0.part = ['mouse', 'eyes'];
 
console.log(worker0.character, worker0.part);
console.log(Worker.prototype.character, Worker.prototype.part);

/**
 * 对所有实例起作用，则需修改原型上的属性
 * worker1.species 相当于 Worker.prototype.species
 * 修改worker0.__proto__.species 相当于 修改 Worker.prototype.species
 * worker0.species 是访问了实例自身的属性
 * 输出结果
 * 1 123 human
 * 2 123 321
 */
 worker0.species = '123';
 console.log('1',worker0.species, worker1.species);
 worker0.__proto__.species = '321';
 console.log('2',worker0.species, worker1.species);
 