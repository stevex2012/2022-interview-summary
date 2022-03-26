// 输入: [1, 2, 3, 4, 5, 6, 7] 和 k = 3
// 输出: [5, 6, 7, 1, 2, 3, 4]

function move(arr,k){
  return [...arr.slice(arr.length - k),...arr.slice(0,k)]
}
console.log(move([1, 2, 3, 4, 5, 6, 7],3));

function debounce(fn){
  let timer = null
  return function(){
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn();
    }, 50);
  }
}

function throdle(fn){
  let timer = null
  return function(){
    if(timer) return;
    clearInterval(timer)
    timer = setInterval(() => {
      fn();
    }, 50);
  }
}