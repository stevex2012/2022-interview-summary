import './main.css'
import '~/main.css'
// import './index.less'
import '@/index.less'
import logo from "../public/logo.png";

const a = 'Hello ITEM'

console.log('00logo',logo)

console.log(a)

@log('hi')
class ABCD {
  name = '23';
  info= ()=> ({
    a:1,
    b:2
  })
}

module.exports = ABCD;
