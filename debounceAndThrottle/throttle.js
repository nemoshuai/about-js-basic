/**
 * 节流，持续触发事件下， 每隔wait时间后执行一次事件，区别于防抖在wait内触发多次，执行最后一次
 * @param {*}} func 
 * @param {*} wait 
 */
function throttle(func, wait) { 
  let timeout, context, args, result;
  let previous = 0;

  const later = function() {
    previous = new Date().valueOf(); // 获取时间戳
    timeout = null;
    func.apply(context, args);
  }

  const throttled =  function() {
    let now = +new Date(); // 获取时间戳
    // 下次触发事件的剩余时间
    const remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if(remaining <= 0 || remaining > wait) {
      // 没有剩余时间即以及渡过超过或等于wait时间或 remaining > wait防止用户修改了系统时间发生now小于previous情况
      if(timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(context, args);
    } else if(!timeout) {
      timeout = setTimeout(later, remaining);
    }
  }

  throttled.cancel = function() {
    clearTimeout(timeout);
    previous = 0;
    timeout = null;
  }

  return throttled;
}

let count3 = 1;
const container3 = document.getElementById('container3');

function getUserAction() {
  container3.innerHTML = count3++;
};

container3.onmousemove = throttle(getUserAction, 1000);
