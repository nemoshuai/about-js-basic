function lazy(url) {
  const scrollDom = document.getElementById('scrollView');
  const img = document.getElementById('img');
  const imgPos = img.getBoundingClientRect();
  if(imgPos.top <= scrollDom.clientHeight) {
    img.src = url;
  }
}

function throttle(fn, wait) {
  let timer = null;
  let prev = 0;

  return function(...args) {
    let now = new Date().valueOf();
  
    if(!timer) {
      prev = now;
      return fn(...args);
    }

    let remaining = now - prev;
    if(remaining > wait) {
      prev = now;
      return fn(...args);
    } else {
      timer = setTimeout(() => {
        clearTimeout(timer);
      }, remaining);
    }
  }
}