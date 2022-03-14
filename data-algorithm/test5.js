// 随机生成一个长度为 10 的整数类型的数组
// ，例如 [2, 10, 3, 4, 5, 11, 10, 11, 20]，将其排列成一个新数组，要求新数组形式如下，例如 [[2, 3, 4, 5], [10, 11], [20]]。
// 去从，桶sort
function creatArr(len = 10) {
  const arr = []
   while(len > 0) {
    //  个位数，还是双位数
    const isTowBitInt = Math.random() > 0.5;

    let baseNum = parseInt(Math.random().toFixed(isTowBitInt ? 2 : 1)*100,10);

    arr.push(baseNum)
    len -- 
   }
   return arr;
}

function bulletSort(arr){
  // 0-9,10-19,
  const res = Array.from({length: 10});
  arr.forEach(item=>{
    const idx = Math.floor(item/10);
    if(!res[idx]){
      res[idx] = [];
    }
    res[idx].push(item)
  })
  console.log(res.filter(item=>item))
}
var arr = creatArr(10)
console.log(arr)
bulletSort(arr)