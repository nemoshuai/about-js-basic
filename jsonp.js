/*
 * @Author: your name
 * @Date: 2021-12-05 17:36:19
 * @LastEditTime: 2021-12-05 17:47:29
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /about-js-basic/jsonp.js
 */

const qs = require('qs');

function jsonp({ url, onData, params }) {
  const script = document.createElement('script');
  const funName = 'JSONPCALLBACK';
  script.src = `${url}${qs.stringify({ callback: funName, ...params })}`;
  
  window[funName] = onData;
  document.body.appendChild(script);
}

jsonp({
  url: 'http://localhost:8000',
  onData: function(res) {
    console.log(res)
  }
})

// node server

const app = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url);
  const obj = qs.parse(query);
  const { callback } = obj;
  const data = { id: 1};
  if(callback) {
    res.end(`${params.callback}${data}`)
  } else {
    res.end()
  }
})

app.listen(8000);