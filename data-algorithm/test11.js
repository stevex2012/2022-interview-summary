// 给定一个数组 nums，编写一个函数将所有 0 
//- 移动到数组的末尾，
//- 同时保持非零元素的相对顺序。
// 输入: [0,1,0,3,12]
// 输出: [1,3,12,0,0]

// 说明:

// 必须在原数组上操作，不能拷贝额外的数组。
// 尽量减少操作次数。
const arr = [0,1,0,3,12]; // 5 3
// [1,0,3,0,12];
// 

function isZero(item){
  return item === 0;
}

function move(arr) {
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if(isZero(element)){
      arr.push(element)
      arr.splice(i,1)
    }
    
  }
  return arr;
}

function moveZeroToLast(arr) {
  let index = 0;
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if(element === 0){
      index++;
    }else if(index !== 0 ){
      arr[i - index ] = element;
      arr[i] = 0;
    }
    
  }
  return arr;
}
console.log(moveZeroToLast([0, 0, 0, 1, 0, 3, 12]))