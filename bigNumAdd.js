let a = "9007199254740991";
let b = "1234567899999999999";

function BigNumAdd(a, b) {
  const maxLen = Math.max(a.length, b.length); // 最大位数
  const a1 = a.padStart(maxLen, 0); // 高位补0
  const b1 = b.padStart(maxLen, 0); // 高位补0
  let f = 0; // 进位
  let sum = '';
  let t = 0;
  let i = maxLen - 1; // 从低位开始
  while(i >= 0) {
    t = parseInt(a1[i], 10) + parseInt(b1[i], 10) + f;
    f = Math.floor(t / 10);
    sum = t % 10 + sum; // sum是字符串。隐式转换
    i--;
  }
  
  if(f == 1) {
    sum = '1' + sum;
  }

  return sum;
}

// 1243575099254740990
console.log(BigNumAdd(a, b));