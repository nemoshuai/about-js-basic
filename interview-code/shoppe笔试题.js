/*
 * @Author: your name
 * @Date: 2022-01-12 15:41:17
 * @LastEditTime: 2022-01-12 15:46:05
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue3-notes/Users/nemo/Desktop/learn/面试题/shoppe笔试题.js
 */


// 将ary拆分为splitCount个数组，保证splitCount个数组中的最大值在所有可能的拆分里最小
// [ [ 1, 2, 4 ], [ 3, 2, 1 ], [ 3, 1, 1 ] ]  最小是7

function splitArray(ary, splitCount) {
  const result = []
  const sumAry = new Array(splitCount).fill(0);

  for(let i = 0; i < splitCount; i++) {
    result[i] = []
  }
// splitcount 
  console.log(result);
  console.log(sumAry)
  for(let i = 0; i < ary.length; i+=1) {
      // find min sum
      let k = 0;
      let minIndex = 0;
      while(k < splitCount) {
          if(sumAry[k] < sumAry[minIndex]) {
              minIndex = k;
          }
          k++;
      }

      // 将当前值push进去
      result[minIndex].push(ary[i]);
      // 计算sum
      sumAry[minIndex] += ary[i]
  }


  console.log(result);
  return result;
}
// splitArray([1, 3, 3,2, 4,2,1,1,1], 3)


// 实现交通灯 红灯3s 绿灯2s 黄灯1s 以此循环