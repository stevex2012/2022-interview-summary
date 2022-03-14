// bubbleSort 
var arr = [10,9,8,7,6,5,4,3,2,1];

function bubbleSort(arr){
  for(let i = 0;i<arr.length;i++){
    for(let j =i+1;j<arr.length; j++){
      if(arr[i]>arr[j]){
        // change swap
        const tmp = arr[i]
        arr[i] = arr[j]
        arr[j] = tmp;
      }


    }
  }
  console.log(arr)
}
bubbleSort(arr);
// [10,9,8,7,6,5,4,3,2,1];
// 
function  bubbleSort1(arr){
  let i = arr.length - 1;
  while(i<arr.length){
    let p = 0;
    for(let j = i;j<arr.length;j++){
      p++;
      if(arr[j]>arr[i]){
        // change swap
        // i = j;
        
        const tmp = arr[i]
        arr[i] = arr[j]
        arr[j] = tmp;
      }
    }

  }
  console.log(arr)
}
// bubbleSort1(arr);

// 如下：{1:222, 2:123, 5:888}，请把数据处理为如下结构：[222, 123, null, null, 888, null, null, null, null, null, null, null]。
