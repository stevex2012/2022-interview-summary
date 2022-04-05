// 
'use strict'
function a (n){
  console.trace()
  if(n===0){
    return 1
  }
  return n * a(n-1)
}

function aa(n, total = 1) {
  console.trace()
  if(n===1){
    return total
  }
  return aa(n-1, n*total)
}

console.log(aa(3))
// 
function a1(){
  console.trace()


}
function a2(){
  console.trace()

  a1()
}
function a3(){
  a2()
  console.trace()

}
// a3()