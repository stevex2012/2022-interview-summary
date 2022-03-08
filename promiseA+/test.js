import { myPromise,log } from "./myPromis.js";

// 异步
// 链式调用

const p = new myPromise((res,rej)=>{
  log(123)
  setTimeout(()=>{
    // rej('ee')
    res('setTimeout')

  },1000)
}).then((val)=>{
  log('val',val)
},(e)=>{
  log('e',e)
})
