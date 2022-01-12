/**
 * 题目1：编写一个 People 类，使其的实例具有监听事件、触发事件、解除绑定功能。（实例可能监听多个不同的事件，也可以去除监听事件）
 */
class People {
  constructor(name) {
    this.name = name
    this.eventListener = {};
  }

  // TODO: 请在此处完善代码
  on(event, func) {
    if(this.eventListener[event]) {
      this.eventListener[event].push(func);
    } else {
      this.eventListener[event] = [func];
    }
  }

  emit(event, ...args) {
    const targetEvent = this.eventListener[event];
    if(targetEvent && targetEvent.length > 0) {
      targetEvent.forEach(func => {
        func(...args);
      });
    }
  }

  off(event, func) {
    const targetEvent = this.eventListener[event];
    if(targetEvent && targetEvent.length > 0) {
      const index = targetEvent.indexOf(func);
      if(index !== -1) {
        targetEvent.splice(index, 1);
      }
    }
  }

  sayHi() {
    console.log(`Hi, I am ${this.name}`)
  }
}


/* 以下为测试代码 */
const say1 = (greeting) => {
  console.log(`${greeting}, nice meeting you.`)
}

const say2 = (greeting) => {
  console.log(`${greeting}, nice meeting you, too.`)
}

const jerry = new People('Jerry')
jerry.sayHi()
// => 输出：'Hi, I am Jerry'

jerry.on('greeting', say1)
jerry.on('greeting', say2)

jerry.emit('greeting', 'Hi')
// => 输出：'Hi, nice meeting you.' 和 'Hi, nice meeting you, too'

jerry.off('greeting', say1)
jerry.emit('greeting', 'Hi')
// => 只输出：'Hi, nice meeting you, too'

/**
 * 题目2：完成 sleep 函数，可以达到下面的效果：
*/

const sleep = (duration) => {
  // TODO
  return new Promise((resolve, reject) => {
    try {
      setTimeout(function() {
        resolve();
      }, duration)
    } catch (err) {
      reject(err);
    }
  });
}

const anyFunc = async () => {
  console.log("123") // 输出 123
  await sleep(300) // 暂停 300 毫秒
  console.log("456") // 输出 456，但是距离上面输出的 123 时间上相隔了 300 毫秒
}

anyFunc();

/**
 * 题目3：完成 deepGet 函数，给它传入一个对象和字符串，字符串表示对象深层属性的获取路径，可以深层次获取对象内容：
 */

const deepGet = (obj, prop) => {
  // TODO: 在此处完善代码
  const propAry = prop.replace(']', '').replace('[', '.').split('.');
  const len = propAry.length;
  let i = 0;
  let target = obj;
  while(i < len && target) {
    target = target[propAry[i]];
    i+=1;
  }

  console.log(target);
  return target;
}

/** 以下为测试代码 */
deepGet({
  school: {
    student: { name: 'Tomy' },
  },
}, 'school.student.name') // => 'Tomy'

deepGet({
  school: {
    students: [
      { name: 'Tomy' },
      { name: 'Lucy' },
    ],
  }
}, 'school.students[1].name') // => 'Lucy'

// 对于不存在的属性，返回 undefined
deepGet({ user: { name: 'Tomy' } }, 'user.age') // => undefined
deepGet({ user: { name: 'Tomy' } }, 'school.user.age') // => undefined

/**
 * 题目4：完成 combo 函数。它接受任意多个单参函数（只接受一个参数的函数）作为参数，并且返回一个函数。
 * 它的作为用：使得类似 f(g(h(a))) 这样的函数调用可以简写为 combo(f, g, h)(a)。
 */

const combo = (...args) => {
  // TODO: 请在此处完善代码
  const funcAry = [...args];
  funcAry.reverse();

  return function() {
    const args = arguments[0]; // 单参数
    let res;
    if(funcAry && funcAry.length > 0) {
      res = funcAry[0](args);
      for(let i = 1; i < funcAry.length; i+=1) {
        res = funcAry[i](res);
      }
    }

    console.log(res);
    return res;
  }
}

/* 以下为测试代码 */
const addOne = (a) => a + 1
const multiTwo = (a) => a * 2
const divThree = (a) => a / 3
const toString = (a) => a + ''
const split = (a) => a.split('')

split(toString(addOne(multiTwo(divThree(666)))))
// => ["4", "4", "5"]

const testForCombo = combo(split, toString, addOne, multiTwo, divThree)
testForCombo(666)
// => ["4", "4", "5"]

/**
 * 题目5：有两个盘子分别放有 5 个和 7 个小球，
 * 两个朋友玩游戏：每个人轮流从两个盘子中拿小球，
 * 每人每次只能从其中一个盘子中拿，
 * 每次可以拿 1 个或者多个（不能一个都不拿），
 * 拿到最后一个小球的人算输。问开局先手和后手是否有必胜策略？如果有，请描述必胜策略。
 */

 /**
  * 答：
  * 开局先手A，A先从7中拿2，使得两个盘子数量相等为5，
  * 此时后手B只能从其中一个拿出1/2/3（若盘子只剩0或者1的话，A就赢了，理由是盘子只剩0时，A只需要让另一个盘子剩1就赢了；只剩1时，A只需要把另一个盘子的球全部拿走），
  * 后手B拿完1/2/3后，先手A使得两个盘子相等，
  * 以此类推，直到盘子中只剩2-2, 此时B只有1/2的选择（因为不能一个都不拿），B拿完后的可能其中一个盘子数量为0或者1，根据上述理由，A必定赢。
  */

