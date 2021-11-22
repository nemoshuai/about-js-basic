const swap = (arr, i, j) =>{
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

// 冒泡排序
// 算法描述：
// 重复地走访过要排序的数列，一次比较两个元素，若顺序错误则交换过来，直到没有需要交换的
// 一趟后最大的元素在最后面，所以j = n - i - 1, 不需要考虑已排序好的末尾
// 空间复杂度：O(1)
// 时间复杂度: O(n^2)-最坏/平均  O(n)-最好
// 稳定性： 稳定

const bubbleSort = array => {
  console.log('bubbleSort before:', String(array));
  for(let i = 0; i < array.length; i+=1) {
    let flag = 0;
    for(let j = 0; j < array.length - i - 1; j+=1) {
      if(array[j] > array[j+1]) {
        swap(array, j, j+1);
        flag = 1;
      }
    }
    if(flag) break;
    console.log('bubbleSort:', String(array));
  }
  console.log('bubbleSort after:', String(array));
}

// bubbleSort([1,2,3,4,6,7,10,9]);


// 直接选择排序
// 算法描述：
// 从序列中选择中最小(大) 放到已排序序列列尾中，然后再从剩下的序列中选择最小(大)接着放到已排序序列列尾直到排序完成
// 初始R[0...n-1]为无序区，有序为空
// 第i趟 R[0..i）为有序区，R(i...n-1]为无序区, 从无序区找到最小k，将第i记录交换
// j 初始为i+1, 所以i只需到array.length - 2，而j需要最后一个记录array.length
// 空间复杂度： O(1)
// 时间复杂度：O(n^2)
// 稳定性：不稳定
const selectionSort = array => {
  console.log('selectionSort before:', String(array));
  let minIndex;
  for(let i = 0; i < array.length - 1; i+=1) {
    minIndex = i;
    for(let j = i + 1; j < array.length; j+=1) {
      if(array[minIndex] > array[j]) {
        minIndex = j;
      }
    }

    swap(array, minIndex, i);
  }

  console.log('selectionSort after:', String(array));
}

// selectionSort([3,4,6,7,1,10,9,2]);

/**
 * 插入排序
 * 算法描述:
 * n个元素的无序数组R[0, n-1]
 * 1、从i=0开始，默认为在已排序序列之中, 
 * 2、取下一个元素current，将已排序序列从后到前扫描
 * 3、如果下标为prevIndex的该元素大于current，则将该元素prevIndex移到前面的位置
 * 4、重复步骤3，直到找到已排序元素中小于或等于元素current的，将current插入到该位置后
 * 5、重复以上步骤
 * 空间复杂度：O(1)
 * 时间复杂度：O(n^2)
 * 稳定性：稳定
 */

const insertSort = arr => {
  console.log('insertSort before:', String(arr));
  let prevIndex, current;
  for(let i = 1; i < arr.length; i+=1) {
    prevIndex = i - 1;
    current = arr[i];
    while(prevIndex >= 0 && arr[prevIndex] > current) {
      arr[prevIndex+1] = arr[prevIndex];
      prevIndex-=1;
    }
    arr[prevIndex + 1] = current;
  }

  console.log('insertSort after:', String(arr));
}

// insertSort([3,4,6,7,1,10,9,2]);

/**
 * 希尔排序
 * 算法描述：
 * 将待排序的系列分为若干子序列进行插入排序
 * 选择gap序列t1...tk 其中ti > tj(i<j) tk=1， 示例: 4,2,1 k=3
 * 根据序列的个数k，进行k躺排序
 * 根据gap ti，将序列划分为若干个长度为m的子序列，对子序列进行插入排序
 * 第k趟 tk=1 子序列为整个序列
 * 空间复杂度: O(1)
 * 时间复杂度： O(n)
 * 稳定性：不稳定
 */
const shellSort = arr => {
  console.log('shellSort before:', String(arr));
  let current, j;
  for(let gap = Math.floor(arr.length / 2); gap >= 1; gap = Math.floor(gap / 2) ) {
    for(let i = gap; i < arr.length; i+=1) {
      j = i;
      current = arr[i];
      while(j - gap >= 0 && arr[j - gap] > current) {
        arr[j] = arr[j - gap];
        j = j - gap;
      }
      arr[j] = current;
    }
  }
  console.log('shellSort after:', String(arr));
}

// shellSort([3,4,6,7,1,10,9,2]);

/**
 * 归并算法：
 * 分治法，将有序的子序列合并，变成有序的序列，2-路归并
 * 空间复杂度：O(n)
 * 时间复杂度: O(nlog2n)
 * 稳定性： 稳定
 */
const merge = (left, right) => {
  let result = [];
  while(left.length > 0 && right.length > 0) {
    if(left[0] <= right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }

  while(left.length > 0) {
    result.push(left.shift());
  }

  while(right.length > 0) {
    result.push(right.shift());
  }

  return result;
}

const mergeSort = arr => {
  if(arr.length < 2) return arr;
  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);
  return merge(mergeSort(left), mergeSort(right));
}

// console.log('mergeSort after', mergeSort([3,4,6,7,1,10,9,2]));

/**
 * 快速排序
 * 算法描述：
 * 分治法，通过一个基准（pivot） 将序列分为两个序列，
 * 1、选出一个基准
 * 2、将比基准小的放到基准前面，比基准大的放到基准后面， 进行分区partition操作，基准则是中间值
 * 3、递归将小于基准的子数列排序 大于基准子数列排序
 * 时间复杂度: 平均O(nlogn) 最坏O(n^2)-基准值选到最大值或者最小值
 * 空间复杂度: O(1)
 */
const partition = (arr, left, right) => {
  const pivot = left;
  let index = pivot + 1;
  for(let i = index; i <= right; i+=1) {
    if(arr[pivot] > arr[i]) {
      swap(arr, i, index);
      index+=1;
    }
  }
  swap(arr, pivot, index - 1);
  return index - 1;
}

/**
 * 挖坑法
 * 算法描述：
 * 1、选定基准元素Pivot，并记住这个位置index，这个位置相当于一个“坑”，并且设置两个指针left和right，指向数列的最左和最右两个元素：
 * 2、接下来，从right指针开始，把指针所指向的元素和基准元素做比较。如果比pivot大，则right指针向左移动；如果比pivot小，则把right所指向的元素填入坑中。
 * 3、接下来，我们切换到left指针进行比较。如果left指向的元素小于pivot，则left指针向右移动；如果元素大于pivot，则把left指向的元素填入坑中。
 * 4、直到left和right重合在了同一位置，把之前的pivot元素，放到index的位置
 * @param {*} arr 
 * @param {*} startIndex 
 * @param {*} endIndex 
 */
// const partition = (arr, startIndex, endIndex) => {
//   const pivot = arr[startIndex];
//   let left = startIndex;
//   let right = endIndex;
//   // 坑的位置，初始等于pivot的位置
//   let index = startIndex;
//   while(right >= left) {
//      // right指针从右向左进行比较
//     while(right >= left) {
//       if(arr[right] < arr[pivot]) {
//         arr[left] = arr[right];
//         index = right;
//         left+=1;
//         break;
//       }
//       right-=1;
//     }
//     // left指针从左向右进行比较
//     while(right >= left) {
//       if(arr[left] > arr[pivot]) {
//         arr[right] = arr[left];
//         index = left;
//         break;
//       }
//       left+=1;
//     }
//   }
//   arr[index] = pivot;
//   return index;
// }

const quickSort = (arr, l = 0, r) => {
  const right = typeof r !== 'number' ? arr.length - 1 : r;
  if(l < right) {
    const partitionIndex = partition(arr, l, right);
    quickSort(arr, l, partitionIndex - 1);
    quickSort(arr, partitionIndex+1, right);
  }
  return ;
}

// let arr = [3,4,6,7,1,10,9,2];
// quickSort(arr);
// console.log('arr', arr);

/**
 * 堆排序
 * 属于选择算法
 * 时间复杂度： O(nlogn)
 * 空间复杂度: O(n)
 * 稳定性：不稳定
 */
const adjustHeap = (arr, index ,length) => {
  let i = index;
  let temp = arr[i]; // 当前值
  for(let k = i * 2 + 1; k < length; k = k * 2 + 1) { // 从i结点的左子结点i*2+1开始
    if(k+1 < length && arr[k] < arr[k+1]) { // k+1为i结点的右子结点
      k+=1; // 若右子结点大于左子结点 将k指向右子结点
    }
    if(arr[k] > temp) { // 若k指向大于i结点，则将
      arr[i] = arr[k];
      i = k;
    } else {
      break;
    }
  }
  arr[i] = temp; // 将temp放到最终的位置，此时的i是k
}

const heapSort = arr => {
  for(let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) { // 从右至左调整结果，第一个非叶子结点开始
    adjustHeap(arr, i, arr.length);
  }
  for(let j = arr.length - 1; j >= 0; j--) {
    // 根据大堆顶的规则，此时arr[0]是最大，与当前最后一个数据交换后，有可能破坏了堆结构，需要重新调整
    // 从后面有序
    swap(arr, 0, j);
    adjustHeap(arr, 0, j);
  }
}

// let arr = [3,4,6,7,1,10,9,2];
// heapSort(arr);
// console.log('heapSort after', arr);

/**
 * 计数排序
 * 算法描述
 * 找出待排序的数组中最大和最小的元素；
 * 统计数组中每个值为i的元素出现的次数，存入数组C的第i项；
 * 对所有的计数累加（从C中的第一个元素开始，每一项和前一项相加）；
 * 反向填充目标数组：将每个元素i放在新数组的第C(i)项，每放一个元素就将C(i)减去1
 * 输入的元素是 n 个 0到 k 之间的整数时
 * 时间复杂度：O(n + k)
 * 空间复杂度：O(n + k)
 */
const findMax = arr => {
  let maxValue = arr[0];
  for(let i = 1; i < arr.length; i+=1) {
    if(arr[i] > maxValue) {
      maxValue = arr[i];
    }
  } 

  return maxValue;
}

const countingSort = arr => {
  const maxValue = findMax(arr);
  const bucket = Array(maxValue+1);
  let sortIndex = 0;
  for(let i = 0; i < arr.length; i++) {
    if(!bucket[arr[i]] && bucket[arr[i]] !== 0) { // 空值初始为0
      bucket[arr[i]] = 0;
    }
    bucket[arr[i]]+=1;
  }

  for(let i = 0; i < bucket.length; i++) {
    while(bucket[i] > 0) {
      arr[sortIndex] = i;
      sortIndex += 1;
      bucket[i] -=1;
    }
  }

  return arr;
}

// let arr = [3,4,6,7,1,10,9,2];
// console.log('countingSort after', countingSort(arr));


/**
 * 桶排序
 * 算法描述：
 * 设置一个定量的数组当作空桶；
 * 遍历输入数据，并且把数据一个一个放到对应的桶里去；
 * 对每个不是空的桶进行排序；
 * 从不是空的桶里把排好序的数据拼接起来。 
 * 时间复杂度：最好O(n)
 */
const findMin = arr => {
  let minValue = arr[0];
  for(let i = 1; i < arr.length; i+=1) {
    if(arr[i] < minValue) {
      minValue = arr[i];
    }
  } 

  return minValue;
}
const bucketSort = (arr, bucketSize = 5) => {
  const minValue = findMin(arr);
  const maxValue = findMax(arr);
  // 桶的初始化
  const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
  const bucket = Array(bucketCount); 
  // 不能用map 空值被跳过
  for(let i = 0; i < bucket.length; i+=1) {
    bucket[i] = [];
  }

  for(let i = 0; i < arr.length; i+=1) {
    const hash = Math.floor((arr[i] - minValue) / bucketSize);
    bucket[hash].push(arr[i]);
  }

  const result = [];
  bucket.forEach((bucketItem, i) => {
    insertSort(bucketItem); // 用插入排序对桶进行排序
    for(let j = 0; j < bucketItem.length; j+=1) {
      result.push(bucketItem[j]);
    }
  });

  return result;
}

// let arr = [3,4,6,7,1,10,9,2];
// console.log('bucketSort after', bucketSort(arr));

/**
 * 基数排序
 * 算法描述
 * 取数组中最大的数，获取位数
 * 从最低位开始取每个位组成radix数组；
 * 对radix进行计数排序（利用计数排序适用于小范围数的特点）
 */

const radixSort = arr => {
  // 获取数组中最大的数，获取位数
  let maxValue = findMax(arr);
  let maxDigit = 0;
  while(maxValue) {
    maxValue = parseInt(maxValue / 10);
    maxDigit+=1;
  }

  const counter = [];
  let mod = 10;
  let dev = 1;
  for(let i = 0; i < maxDigit; i+=1, dev = dev * 10, mod = mod * 10) {
    for(let j = 0; j < arr.length; j+=1) {
      const bucket = parseInt((arr[j] % mod) / dev);
      if(!counter[bucket]) {
        counter[bucket] = [];
      }
      counter[bucket].push(arr[j]);
    }
    
    // 将桶数据重回arr
    let index = 0;
    for(let j = 0; j < counter.length; j++) {
      if(counter[j]) {
        let value;
        while(counter[j].length > 0) {
          value = counter[j].shift();
          arr[index] = value;
          index+=1;
        }
      }
    }
  }
  console.log('radixSort after:', arr);
 }

radixSort([3,4,6,7,1,10,9,2]);