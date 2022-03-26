// 给定一个整数数组和一个目标值，找出数组中和为目标值的两个数。

// 你可以假设每个输入只对应一种答案，且同样的元素不能被重复利用。

// 示例：

// 给定 nums = [2, 7, 11, 15], target = 9

// 因为 nums[0] + nums[1] = 2 + 7 = 9
// 所以返回 [0, 1]

function getTargetItems(arr, target) {
  let left = 0;
  let right = 0;
  for (let i = 0; i < arr.length; i++) {
    const l = arr[i];
    for (let j = i+1; j < arr.length; j++) {
      const r = arr[j];
      console.log(l+r )
      if(l+r === target){
        left = i;
        right = j;
        break;
      }
    }
    
  }
  return [left, right]
}

function foo(arr, target){
  let map = {}
  arr.forEach((el, idx) => {
    // const key = Symbol(el)
    // map[key] = idx;
    map[el] = idx;
  });
  console.log('map',map)
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    const t = target - element;
    console.log(Symbol(t))
    // if(map[Symbol(t)]){
      if(map[t]){
      return [map[t],index]
    }
    
  }
}
console.log(foo([2, 7, 11, 15], 26))
// console.log(getTargetItems([2, 7, 11, 15], 26))