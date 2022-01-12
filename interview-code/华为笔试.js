// let vlans = readline().split(' ').map(item => item.split('-').map(x => Number(x)));
// let targetVlan = Number(readline());
// // 排序
// vlans池
function func(s, num) {
  let vlans = s.split(',').map(item => item.split('-').map(x => Number(x)));
  let targetVlan = Number(num);
  console.log(vlans);
  vlans.sort((a, b) => {
    return a[0] - b[0];
 });
 
 for(let i = 0; i < vlans.length; i+=1) {
     if(vlans[i].length === 1) {
         if(vlans[i][0] === targetVlan) {
             vlans.splice(i, 1);
             break;
         } 
     } else if(vlans[i][0] <= targetVlan && vlans[i][1] >= targetVlan) {
         let left = [];
         let right = [targetVlan + 1, vlans[i][1]];
         if(vlans[i][0] <= targetVlan - 1) {
             left = vlans[i][0] === targetVlan - 1 ? [vlans[i][0]] : [vlans[i][0], targetVlan - 1];
         }
         
         if(vlans[i][1] >= targetVlan + 1) {
             right = vlans[i][1] === targetVlan + 1 ? [vlans[i][1]] : [targetVlan + 1, vlans[i][1]];
         }
         
         vlans.splice(i, 1);
         if(right.length) vlans.splice(i, 0, right);
         if(left.length) vlans.splice(i, 0, left);
         break;
     }
 }
 
 console.log(vlans.map(item => item.join('-')).join(','));
}






// func('20-21,15,18,30,5-10', '10');

// ‘o’偶然次的最长字符串
function fn1(s) {
  const total = s.split('').filter(c => c === 'o').length;
  if(total % 2 === 0) {
    if(total === 0) {
        console.log(s.length);
    } else {
        console.log(s.length + 1);
    }
} else {
    let max = -Infinity;
    s = s + s[0];
    for(let i = 0; i < s.length; i++) {
      for(let j = i + 1; j <= s.length; j++){
          let temp = s.slice(i, j);
          let count = temp.split('').filter(c => c === 'o').length;
          if(count % 2 === 0 && count !== 0) {
            max = Math.max(max, temp.length);
          }
      }
   }

    console.log(Math.max(max, 0));
}
}

// fn1('llookok');

// 华为笔试2：骰子是一个正方体，每个面有一个数字，初始为左1，右2，前3，后4，上5，下6，
// 用123456表示这个状态，放置在平面上，可以向左翻转（用L表示向左翻转1次）；
// 可以向右翻转（用R表示向右翻转1次）；可以向前翻转（用F表示向前翻转1次）；
// 可以向后翻转（用B表示向后翻转1次）；可以逆时针翻转（用A表示向逆时针翻转1次）；
// 可以向顺时针翻转（用C表示向顺时针翻转1次）；
function Left(map) {
  const { left, right, up, down } = map;
  map.left = up;
  map.up = right;
  map.right = down;
  map.down = left;
}

function Right(map) {
  const { left, right, up, down } = map;
  map.up = left;
  map.right = up;
  map.down = right;
  map.left = down;
}

function Front(map) {
  const { front, back, up, down } = map;
  map.front = up;
  map.up = back;
  map.back = down;
  map.down = front;
}

function Back(map) {
  const { front, back, up, down } = map;
  map.front = down;
  map.up = front;
  map.down = back;
  map.back = up;
}

function A(map) {
  const { front, back, left, right } = map;
  map.front = left;
  map.right = front;
  map.back = right;
  map.left = back;
}

function C(map) {
  const { front, back, left, right } = map;
  map.front = right;
  map.right = back;
  map.back = left;
  map.left = front;
}

function f2(s) {
const map = {
    'left': 1,
    'right': 2,
    'front': 3,
    'back': 4,
    'up': 5,
    'down' : 6,
};

for(let i = 0; i < s.length; i++) {
    switch(s[i]) {
        case 'L':
            Left(map);
            break;
        case 'R':
            Right(map);
            break;
        case 'F':
            Front(map);
            break;
        case 'B':
            Back(map);
            break;
        case 'A':
            A(map);
            break;
        case 'C':
            C(map);
            break;
        default:
            break;
    }
}

console.log(Object.values(map).join(''));
}

f2('FCR');

// 字节笔试题
function fn3() {
    const b = { 'a.b.c': 123, 'a.d': 456, 'f': 445 };
    const keys = Object.keys(b);
    const res = {};
    keys.forEach(key => {
        let tempKeys = key.split('.');
        let parentKey = tempKeys[0];
        tempKeys = tempKeys.slice(1).reverse();
        const tempRes = tempKeys.reduce((res, cur) => ({[cur]: res}), b[key]);
        res[parentKey] = res[parentKey] ? {
            ...res[parentKey],
            ...tempRes,
        } : tempRes;
    });

    console.log(res);
}


// 逢7 过
function fn4() {
    const ary = '0 1 0'.split(' ').map(item => parseInt(item));
const count = ary.reduce((sum, cur) => cur + sum);
const N = ary.length;
let K = 7;
let cur = 1;
let res = Array(N).fill(0);
let index = count;
while(index && K <= 7 * count) {
     if(K % 7 === 0 || K.toString().split('').includes('7')) {
         res[K % N - 1] = res[K % N - 1] + 1; 
         index--;
     }
     K++;
}

console.log(res.join(' '));
}

function fn5() {
    function fillCondition(str) {
        const count = str.split('').filter(item => isNaN(item)).length;
        if(count === 0 || count > 1 || count === str.length) {
          return false;
        }
        return true;
      }
      
      const str = 'abC124ACb';
      const charCount = str.split('').filter(item => isNaN(item)).length;
      if(charCount === 0 || charCount === str.length) {
          console.log(-1);
          return;
      }
      
      let l = 0;
      let r = l + 1;
      let max = 0;
      while(l < r && r < str.length) {
        if(fillCondition(str.slice(l, r+1))) {
          max = Math.max(max, r - l + 1);
        } else {
          while(l < r && !fillCondition(str.slice(l, r+1))) {
            console.log(str.slice(l, r+1));
            l++;
          }
          if(fillCondition(str.slice(l, r+1))) {
            console.log(str.slice(l, r+1));
            max = Math.max(max, r - l + 1);
          }
        }
        r++;
      }
      
      console.log(max);
}