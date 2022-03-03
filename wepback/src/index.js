import './main.css'
import '~/main.css'
// import './index.less'
import '@/index.less'
// import logo from "../public/logo.png";
import { add } from "./add.js";
// const a = 'Hello ITEM'

// console.log('00logo',logo)
// add(1,2)
// console.log(a)
console.log(add(1,2))

import('./desc.js').then(()=>{
  console.log('123123123')
})


