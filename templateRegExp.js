function fn() {
  var t="银行：${bankName}，商家名称：${merchantName}，订单号：${orderNum}";
  var order={
    "bankName": "工行",
    "merchantName": "小卖部",
    "orderNum": "123456"
   };

  var reg = /\$\{(.*?)\}/g;
  let keys = [];
  let res = 1;
  while(res) {
    res = reg.exec(t);
    if(res && res[1]) { keys.push(res[1]);};
  }

  console.log(keys);

  for(let k of keys) {
    t = t.replace('${'+k+'}', order[k]);
  }

  console.log(t);
}

fn();