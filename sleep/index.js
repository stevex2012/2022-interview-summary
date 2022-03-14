// sleep sleep(3)
// promise async/await generator
// function sleep(time) {

// }
// promise 
function sleep(time){
  return new Promise((res)=>setTimeout(() => {
      res(1)
  }, time))
}
// sleep(5000).then(res=>console.log('5000'))
// async/await
async function sleep1(time){
  const a  = await sleep(time)
  console.log('sleeps')
}
// sleep1(5000)

// generator

function *sleep3(time){
  yield sleep(time);
  console.log('fisleep3rst')
}
// const g = sleep3(5000);
// console.log(g.next().value.then(()=>console.log('------')))
// 用 sort() 对数组 [3, 15, 8, 29, 102, 22] 进行排序，输出结果
var arr1 = [3, 15, 8, 29, 102, 22];
arr1.sort((a,b)=>a-b)
console.log(arr1)
arr1.sort((a,b)=>b-a)
console.log(arr1)

