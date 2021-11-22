const STATUS = {
  PENDING: 'pending',
  FULFILLED: 'fulFilled',
  REJECTED: 'rejected',
};

function Promise(fn) {
  let state = STATUS.PENDING; // 初始化状态为PENDING
  let value = null; // 传入resolve的值或者reject的错误
  const callbacks = []; // then中传入的回调

   // then返回一个新的Promise, 链式调用，解决’回调地狱‘的问题
  this.then = function(onFulfilled, onRejected) {
    return new Promise((resolve, reject) => {
      // handle传入回调对象
      handle({
        onFulfilled,
        onRejected,
        resolve, // 链式调用Promise, 下一个promise的resolve
        reject, // 链式调用Promise, 下一个promise的reject
      });
    });
  }

  // 错误回调
  this.catch = function(onError) {
    this.then(null, onError);
  }

  // 不管状态如何，都要执行一些操作onDone
  this.finally = function(onDone) {
    this.then(onDone, onDone);
  }

  /**
   * 通过Promise.resolve和Promise.reject 将不是promise实例包装成Promise实例
   * Promise.resolve({name:'winty'})
   * Promise.reject({name:'winty'})
   * 等价于
   * new Promise(resolve => resolve({name:'winty'}))
   * new Promise((resolve,reject) => reject({name:'winty'}))
   */

  this.resolve = function (value) {
    if (value && value instanceof Promise) {
      return value
    } if (value && typeof value === 'object' && typeof value.then === 'function') {
      const { then } = value
      return new Promise((resolve) => {
        then(resolve)
      })
    } if (value) {
      return new Promise(resolve => resolve(value))
    }
    return new Promise(resolve => resolve())
  }

  this.reject = function (value) {
    return new Promise(((resolve, reject) => {
      reject(value)
    }))
  }

  // 传入一组promise数组, 全部都为fulfilled状态后才会执行then, 返回的数据是数组（每一个promise返回数据的集合）
  this.all = function(promiseArr) {
    const arr = [...promiseArr];
    return new Promise((resolve, reject) => {
      if(arr.length === 0) resolve([]);
      let remainLen = arr.length;

      function res(i, val) {
        try {
          if(val && (typeof val === 'object' || typeof val === 'function')) {
            let { then } = val;
            if(typeof val === 'function') {
              then.call(val, function(val) {
                res(i, val);
              }, reject);

              return;
            }
          }

          arr[i] = val;
          //  每当一个promise的状态改变为fulfilled, 计数器减一
          if(--remainLen === 0) {
            resolve(arr);
          }
        } catch(error) {
          reject(error);
        }
      }

      for(let i = 0; i < arr.length; i += 1) {
        res(i, arr[i]);
      }
      
    });
  }

  // 数组中某一个promise为fulfilled时就执行，将new Promise的resolve, reject注入到每一个
  this.race = function(arr) {
    const ret = [...arr];
    return new Promise(function(resolve, reject) {
      for(let i = 0; i < ret.length; i+=1) {
        ret[i].then(resolve, reject);
      }
    });
  }

  function resolve(newValue) {
    const fn = () => {
      // pending变成fulfilled的过程，所以当前state一定是要pending才会进入逻辑
      if(state !== STATUS.PENDING) return;

      // 对当前promise的返回值进行判断处理 对应到handle里callback.resolve(newValue) 
      if(newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
        const { then } = newValue; 
        // 当前resolve newValue 返回一个promise，新promise中无then，是没办法进行链式调用，所以需要注入回调
        if(typeof then === 'function') {
          // 调用了新的promise的then方法，注入了上一个promise的resolve方法作为 newPromise.then(resolve)
          then.call(newValue, resolve, reject); 
          return;
        }
      }
      
      state = STATUS.FULFILLED;
      value = newValue; // 传入resolve的值
      handleCB(); // 处理回调
    }

    setTimeout(fn, 0); // PromiseA+ 没法模拟微任务，用宏任务模拟微任务
  }

  function reject(error) {
    const fn = () => {
      if(state !== STATUS.PENDING) return;
      
      if(error && (typeof error === 'object' || typeof error === 'function')) {
        const { then } = error;
        if(typeof then === 'function') {
          // 调用了新的promise的then方法，注入了上一个promise的resolve方法作为 newPromise.then(resolve)
          then.call(error, resolve, reject); 
          return;
        }
      }

      state = STATUS.REJECTED;
      value = error;
      handleCB();
    }

    setTimeout(fn, 0);
  }

  function handleCB() {
    while(callbacks.length) {
      const callback = callbacks.shift();
      handle(callback);
    }

    fn(resolve, reject);
  }

  function handle(callback) {
    if(state === STATUS.PENDING) {
      callbacks.push(callback);
      return;
    }

    // 当前promise fulfilled/reject后，开始进行下一个promise
    // 调用下一个promise的resolve，才能完成到下一个then(); then().then()
    const cb = state === STATUS.FULFILLED ? callback.onFulfilled : callback.onRejected;
    const next = state = STATUS.FULFILLED ? callback.resolve : callback.reject;

    if(!cb) {
      next(value); // 没有onFulfilled/onRejected回调时，传入resolve/reject
      return;
    }

    // 异常通常是指在执行成功/失败回调时代码出错产生的错误
    try {
      const ret = cb(value); // 处理then中的onFulfilled/onRejected回调
      next(ret); // 上一个Promise的onFulfilled/onRejected回调的返回值传入，调用了下一个promise的resolve/reject, 证明把下一个promise的状态从pending转为fulFilled/reject
    } catch(error) {
      callback.reject(error);
    }
  }
}

const p1 = new Promise(function(resolve, reject) {
  console.log('p1');
  resolve('re1');
});

p1.then(data => {
  console.log('p2', data);
  resolve('re2');
});

console.log('Promise', Promise);

export default Promise;
