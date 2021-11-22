// new的作用就是简化 1 2 4 这3个步骤
// 构造函数
function Worker(name, id) {
  let obj = {}; // 1、创建临时对象
  obj.__proto__ = Worker.prototype; // 2、__proto__ 绑定原型

  obj.name = name; // 3、赋值属性
  obj.id = id;

  return obj; // 4、返回临时对象
}

Worker.prototype = {
  // 所有实例共有
  job: 'worker',
  species: 'human', 
  character: ['hard', 'honest', 'brave'],
  part: ['head', 'face', 'norse'],
  say() {
    console.log('I am Worker');
  }
}


// 不用new关键字 创建实例
const worker0 = Worker('Eden', '110');
/**
 * 输出结果
 * worker Worker { name: 'Eden', id: '110' }
 */
console.log('worker', worker0, worker0.__proto__);
