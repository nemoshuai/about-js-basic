/**
 * 原理： 持续时间触发事件下，事件在wait后执行, 在此期间触发事件
 * @param {} func 
 * @param {*} wait 
 * @param {*} immediate 
 */
function debounce(func, wait, immediate) {
  let timeout, result;
  
  const debounced =  function() {
    const context = this;
    const args = arguments;
    
    if(timeout) clearTimeout(timeout);

    if(immediate) {
      // 第一次事件触发立即执行而不是等wait才执行, wait后再触发事件执行才能执行
      let callNow = !timeout;
      timeout = setTimeout(function() {
        timeout = null;
      }, wait);

      // 只有这里才能获取result
      if(callNow) result = func.apply(context, args);
    } else {
      timeout = setTimeout(function(){
        func.apply(context, args);
      }, wait);
    }

    return result;
  }

  debounced.cancel = function() {
    clearTimeout(timeout);
    timeout = null
  }

  return debounced;
}

let count = 1;
let count1 = 1;
const container = document.getElementById('container');

function getUserAction() {
    container.innerHTML = count++;
};

const container1 = document.getElementById('container1');

function getUserAction1() {
    container1.innerHTML = count1++;
};

container.onmousemove = debounce(getUserAction, 1000);

container1.onmousemove = debounce(getUserAction1, 1000, true);