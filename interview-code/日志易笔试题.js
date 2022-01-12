/*
 * @Author: your name
 * @Date: 2021-12-24 15:15:19
 * @LastEditTime: 2022-01-12 15:42:53
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /undefined/Users/nemo/Desktop/temo-1.js
 */

// 栈， 仅存储正整数 push pop getMax
class Stack {
  constructor() {
    this.stack = [];
    this.maxStack = [];
  }

  push(val) {
    if(typeof val === 'number' && val === Math.floor(val) && Math.abs(val) === val)  {
      // 判断是数字 && 整数 && 正数
      this.stack.push(val);

      if(this.maxStack.length === 0 || this.maxStack[this.maxStack.length - 1] <= val) {
        this.maxStack.push(val)
      }
    }
  }

  pop() {
    const val = this.stack.pop();
    if(this.maxStack.length > 0 && val === this.maxStack[this.maxStack.length - 1]) {
      this.maxStack.pop()
    }

    return val;
  }

  getMax() {
    return this.maxStack.length > 0 ? this.maxStack[this.maxStack.length - 1] : -1;
  }
}

// const stack = new Stack();
// stack.push(2);
// stack.push(1);
// stack.push(3.3);
// console.log(stack.getMax());
// console.log(stack.pop());
// console.log(stack.getMax());


// [{2:2}, {1:2}, {1:2}, {3:3}]
// [{item: prevMaxIndex}]

const isCondition = val => typeof val === 'number' && val === Math.floor(val) && Math.abs(val) === val;

class Stack1 {
  constructor() {
    this.stack = []
  }

  push(val) {
    if(isCondition(val)) {
      if(this.stack.length === 0) {
        this.stack.push({
          val,
          prevMaxIndex: 0,
        })
      } else {
        const prevMaxIndex = this.getMaxIndex();
        this.stack.push({
          val,
          prevMaxIndex: val > this.stack[prevMaxIndex].val ? this.stack.length : prevMaxIndex
        })
      }
    }
  }

  pop() {
    const element = this.stack.pop();
    return element ? element.val : -1;
  }

  getMax() {
    return this.stack.length > 0 ? this.stack[this.getMaxIndex()].val :  -1;
  }

  getMaxIndex() {
    return this.stack[this.stack.length - 1].prevMaxIndex
  }

}

// const stack = new Stack1();
// stack.push(2);
// stack.push(1);
// stack.push(3.3);
// console.log(stack.getMax());
// console.log(stack.pop());
// console.log(stack.getMax());

// 由0和1组成的19位字符串，首位和末位都是0，不能出现连续2个0或者连续3个1，这样的字符串有多少个？（不需要写程序，计算出来即可）

function isMatch(ary) {
  if(ary.indexOf(-1) !== -1) {
    return false;
  }

  for(let i = 1; i < 19; i+=1) {
    if(i - 1 >= 0 && ary[i] === 0 && ary[i - 1] === 0) {
      return false;
    }
    if(i - 2 >= 0 && ary[i] === 1 && ary[i - 1] === 1 && ary[i - 2] === 1) {
      return false;
    }
  }
  return true;
}

function generator19() {
  let strArray = new Array(19).fill(-1);
  strArray[0] = 0;
  strArray[18] = 0;

  let res = [];
  var backtrace = function(path, cur) {
    if(cur === 18) {
      // console.log(path)
      if(isMatch(path)) {
        res.push([...path])
      }
      return;
    }

    for(let element of [0, 1]) {
      path[cur] = element;
      backtrace(path, cur + 1);
      path[cur] = -1;
    }
  }

  backtrace([...strArray], 1);

  console.log(res)
}

generator19()

`
IP中四段要么是数字要么是*，并且*一定要在数字后面，以下是合法输入范例：
*.*.*.*
192.*.*.*
192.168.*.*
192.168.1.*
192.168.1.10
`
const judge0 = numStr => numStr[0] === '0' && numStr !== '0';
/**
 * @param {String} text
 * @return {Boolean}
 */
function checkIfInputValid(text) {
  const ary = text.split('.');
  if(ary.length !== 4) return false;

  let startFlag = -1; // *号首次出现的位置
  for(let i = 0; i < ary.length; i+=1) {
    if(ary[i] === '*') {
      startFlag = i;
    } else if(/^\d+$/.test(ary[i])) {
      // 非* 判断是否前面出现过*
      if(startFlag > -1) {
        // console.log('1', startFlag, ary[i])
        return false;
      }

      if(judge0(ary[i])) {
        return false;
      }

      let num = parseInt(ary[i], 10)
      if(!(0 <= num && num <= 255)) {
        // ip范围为0-255
        return false;
      }
    } else { 
      // 非数字 非*
      return false;
    }
  }

  return true;
}

console.assert(checkIfInputValid('1.1.*')===false, "you have only three segment");
console.assert(checkIfInputValid('1.1.*.*')===true, "you're not valid");
console.assert(checkIfInputValid('1.1.1.*')===true, "why are you here?");
console.assert(checkIfInputValid('269.1.1.*')===false, "269 exceed range");
console.assert(checkIfInputValid('192.*.2.1')===false, 'asterisk can\'t occur before number');
console.assert(checkIfInputValid('19a.2.001.1')===false, 'alphabet can\'t occur');
console.assert(checkIfInputValid('19.2.0001.1')===false, 'segment can\'t be 0000');

function checkIfInputValid5(text) {
  const ns = text.split('.');
  if (ns.length !== 4){
      return false;
  } else {
      let metAsterisk = false;
      for (const n of ns) {
          if (/^(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/.test(n)) {
              if (metAsterisk){
                  // 星号在数字前 192.*.2.1
                  return false;
              }
          } else if (n === "*"){
              metAsterisk = true;
              
          } else {
              return false;
          }
      }
      return true;
  }
}