// 例如：给定 nums1 = [1, 2, 2, 1,3]，nums2 = [2, 2]，返回 [2, 2]。
// 给定两个数组，写一个方法来计算它们的交集
var arr1 = [3,1, 2, 2, 1,3];
var arr2 = [2, 2,3,4,5,6];

function foo(arr1,arr2){
  let pos = null;
  let res = []
  for(let i=0;i<arr1.length;i++){
    for(let  j=0;j<arr2.length;j++){
      if(arr1[i] === arr2[j] && !res[i]){
        res.push(arr1[i])
        break;
      }
    }
  }
  console.log(res)
}
// foo(arr2,arr1)
function foo1(arr1,arr2){
  return arr1.filter(item=>{

    return arr2.includes(item)
  })
}
console.log(foo1(arr1,arr2));

const nums = arr1.filter(v => arr2.some(w => w === v))
console.log(nums)
