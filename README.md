# 面试总结（查缺补漏）

## 自我介绍
面试官好
- 个人基本信息：我叫shiquan，17年初从事前端开发，目前有5年的前端开发经验
- 公司经历：
  在5年开发生涯中，服务过3家公司，
  第一家：长安股份有限公司，主要工作是长安商场相关业务开发，技术站butterfly(jq+backbone)实现，主要有3端pc/h5/app（cordova+webview）小程序端，车和美商场数据看版。后期h5 迁移到react（基于react的官方脚手架）
    成长点：商场活动页面生成器，node+react，业务痛点：每次开发流程，都是手动切页面+静态布局+定位按钮（跳转商成页面），把压缩包给运营（上传），低效、大量重复工作，
    当时自学了node，觉得可以通过fs模块实现文件的生成
      第一版：使用node写了脚本，第一版流程，切好图片，在图片文件下执行脚本文件，生成静态页面，缺点：手动切图，需要二次开发，添加跳转按钮
      第二版：node+express+react开发一个生产页面，手动切片，按序上传，定义每个图片为一个楼层，每层可以添加按钮，拖动定位，按钮可以配置基本属性，配置完成后上传数据到express服务器，生成静态页面。文件（压缩包）可下载。缺点：需要通过ps手动切图片
      第三版：使用canvas切割图片。缺点：后期发现图片过大，导致请求实体过大，请求失败，需要改进成数据切片分步上传。每次都需要下载，没有和运营服务器打通，直接替换文件
  第二家：firmoo跨境电商，主要负责商城的日常迭代和前端性能优化，技术栈：nextjs
    成长点：
      页面lighthouse得分，60---》90左右
      你都做了哪些优化点：
        1.使用svg替换图片图标
        2.添加webpack plugin 打包过程，去掉无效css
        3.通过脚本工具合并公共css
        4.增加cdn，把不同静态资源，放在不同域名下面
        5.给公共文件，增加强缓存
        6.使用异步加载组件，主要针对在首屏外dom的内容
        7.把首屏非必要接口数据通过异步加载，减少服务端请求
        8.建立监控机制：每周统计通过网站测试网页在不同国家的打开得分。缺点：需要手动测试，没有建立一个自动化的性能监控平台
      简单低代码平台：express+react
        背景：在网页中动态嵌入html代码端，每次开发都是开发人员开发+手动cv管理页面，耗时切过程容易错乱，测试后，再由运营cv到生成环境管理页面
        沉淀常用的代码片段组件，定义楼层形式，每个楼层可添加一个组件。楼层间可以拖动换位置
        左边是组件栏，右边是组件属性编辑+楼层div简单的css属性编辑
        编辑后通过发送数据到node服务器，分析入口依赖，动态构建打包入口，打包生成html代码片段，html代码片段回显在客户端
        第三方组件库react，采用cdn的加载方式，减少片段代码。
        提高运营修改方案效率，解放开发人员减少高重复性工作
  第三家：腾讯全资子公司-云智，技术栈：react开发tob后台管理页面，tarojs开发小程序
    富文本编辑器多端渲染方案：自定义组件有交互+常规html
      方案一：导出rawdata数据，通过pcrender/wxreder组件渲染，还需要传入cmpmap（pc/小程序需要分开开发），渲染端需要加载rawdata的解析方法

      方案二：通过tag区分常规html+自定义组件，通过数据切片的方式，每个片段包含一个div，
      如果是自定义组件，吧组件需要的数据通过注入到div属性上，
      吧最后富文本导出的数据，通过打包工具生成一个在线js，渲染端只需要引入js，js里面体统一个自运行函数
      渲染端通过接口获取数据，数据就是一个src，通过script标签加载，
      js加载完成执行函数，会干2件事情
      render函数，区分tag
        常规tag走innerhtml
        自定义组件读取props，通过reactdom.render方式渲染
- 爱好
  - 平时喜欢健身（每周3-5次）、看书、羽毛球（每周1-2次）
  自我评价一个相对自律的人

## 每家公司的成长点
  第一家CA：静态页面生成器
  第二家firmoo：简单的代码生成器
  第三家：富文本多端渲染方案


## 详细说明自己的优点 
  - 页面性能优化（列出来）
  - 重复工作工具化（页面生成工具需要详细说清楚，下来多练习）


## react 
相关面试题
  - react render 流程 <https://juejin.cn/post/6959120891624030238>
    - 首次：jsx-->react.createElm-->生成fiber-tree(render阶段)--->commit阶段（loop创建el node，appendchild）
    - 更新: 状态更新--->render阶段（深度优先遍历创建fiber tree）-->reconciler算法标记变化点（这一步需要对边原来的fiber tree）---->commit

  - vode为什么需要$typeof属性
    - 安全，防止xss攻击（XSS 攻击是页面被注入了恶意的代码），csr/ssr的时候，如果没有这个标识位，恶意接口拦截，返回reactCreatElmg格式数据，回发生什么，react vnode数据结构，并且被render
    - typeof是symbol，Symbol是无法 json化
    - 
  - 什么fibber
    - 2层含义：程序架构、数据结构（有了fiber，怎么可执行可中断，可恢复）
    - 链表结构- child（第一个字节点）,sibling（第一个兄弟节点）,return(指向父级node),其中还需要记state，ref，props等信息
    - 支持vnode的增量渲染
  - react diff dom的事件复查度为什么是O(n)
    - 分层比较，2个vnode只会比较同一层
    - 不同类型的组件，树形结构不同\
    - 统一层级的子组件通过key来区分，update，remove，add
  - 16之前和之后的区别（fiber）
    - 16之前，更新dom操作，一气呵成，dom层级过深，过大，导致浏览器卡顿，无法实时响应，
    - 16fiber架构，借用操作系统协同调度思想，把页面的操作（点击，加载资源，执行脚本，。。。分成不同优先级任务，让这个过程变得可中断），实现根据任务优先级切切片调用，在必要的时，让出控制权
  - 源码
  - hook实现及源码，为什么不能条件语句中执行
    - react hook 为什么不能在条件/循环语句中使用
      - hook在函数组件（fcmp）中使用，fcmp是无状态，想要做到状态控制，需要一个必包保存fcmp中的hooks（状态），而react中采用的是一个单向链表保存fcmp中的调用顺序，fcmp中每一个hook的使用，会按照实行顺序链接到单向链表上，如果使用条件/循环，那么链表的上对应顺序就混乱，增加bug风险
  - react hooks 设计思想
  - 自己如何实现一个hooks库
  - hoc和hooks的区别
    - hoc 是接受一个组件，返回一个新组件的函数
  - react组件性能监控方案（hoc）
  - useEffect 和 useLayoutEffect 的区别
  - react合成事件 
    - 绑定到dom上的事件被统一绑定在根节点上
    - dom上的事件，被react处理替换为空函数 function noop(){}
    - React 实际上并不将事件附加到子节点本身，React 使用单个事件侦听器侦听顶层的所有事件，意味着 React 在更新 DOM 时不需要跟踪事件监听器。
    - 为什么需要设计合成事件系统：抹平浏览器之间的差异，不需要跟踪事件监听器
    - SyntheticEvent 实例将被传递给你的事件处理函数，它是浏览器的原生事件的跨浏览器包装器
    - return false 不能阻止事件传递，使用e.stopPropagation() 或 e.preventDefault() 作为替代方案
    - 如需注册捕获阶段的事件处理函数，则应为事件名添加 Capture
    - React 17 开始，onScroll 事件在 React 中不再冒泡。这与浏览器的行为一致，并且避免了当一个嵌套且可滚动的元素在其父元素触发事件时造成混乱
  - react是单向数据流，单父组件rerender后，子组件的props没有变化，也会rerender
  - react-rerender机制
  - react---Portals插槽
  - 3种组件-fcmp/purCmp/classCmp;
  - useState 和 useReducer的区别
  - react context原理（作用域链？）
  - forwardRef 和通过prop传递ref的区别
  - setState异步还是同步
    - 异步： 在 React 可以控制的地方，就为 true，比如在 React 生命周期事件和合成事件中，都会走合并操作，延迟更新的策略。
    - 同步： 在 React 无法控制的地方，比如原生事件，具体就是在 addEventListener 、setTimeout、setInterval 等事件中，就只能同步更新
  - 为什么不能用index作为key
    - 当数组顺序变化的时候，所有的vnode都将重建
  - StrictMode 
    - 识别废弃的生命周期、提示一些不安全的api使用
  - 解决props传递层级过深，context/使用第三状态管理库，props挂在state上
  - 防止react组件重复render
    - memo only fcmp
    - clsCMP使用shouldComponentUpdate()
  - context + useReducer 状态管理
## 如何设计一个接入无感知的埋点sdk系统
目的：接入系统无需手动添加sdk，无需手动添加任何事件
- 初始化
 - 集成到脚手架中，实现内置
 - 打包的时候，通过ci/nodejs自动注入（这里需要考虑开发时候的调试）
- 如果自动上报
  - 监听浏览器的一些api事件，load，unload,beforeunload等
  - 上报内容和格式，哪些情况需要触发，需要协商
  - 按钮的点击事件怎么收集
    - 可以通过事件委托的方式，事件冒泡，在body上添加事件，根据冒泡机制触发（需要考虑事件阻止冒泡的问题）
    - 通过ast分析，所有的button添加上报逻辑
    - 规定button使用统一组件，上报逻辑由button组件触发
## webpack原理
webpack是一个川行模块打包器，一切皆模块，build过程中会广播很多事件（切片编程思想），loader处理非js文件，plugin控制输出内容
webpack 默认支持js、json
webapck server chunk在内存中
webpack5 asset 模块，内置file/url-loader
利用缓存，提高构建速度 babel-loader 启动缓存 默认缓存位置./node_modules/cache/babel-loader
压缩css
压缩js terser-webpack-plugin
tree-shaking 除没有使用的代码，以降低包的体积 webpack 默认支持 需要在 .bablerc 里面设置 models：false
打包为空，入口文件没有代码使用
 - 打包流程
   - 初始化参数，执行run func，根据入口文件，分析每个文件的依赖文件，构建依赖map，调用loader处理不同类型文件，调用plugin修改输出内容
 - loader 吧非js/json转化为webpack能够处理的内容 ['style-loader','css-loader']处理顺序 后--->前
   - style-loader Inject CSS into the DOM.
   - css-loader
   - postcss-loader css浏览器兼容问题 ，需要配置post.config.js文件，和兼容性.browserslistrc 文件
   - less-loader 需要less module
   - sass-loader 需要node-sass
   - mini-css-extract-plugin - 提取css单独文件
   - file-loader 解决图片引入问题，并将图片 copy 到指定目录，默认为 dist
   - url-loader 解依赖 file-loader，当图片小于 limit 值的时候，会将图片转为 base64 编码，大于 limit 值的时候依然是使用 file-loader 进行拷贝
   - img-loader 压缩图片
   - include/exclude 
   - thread-loader 多进程打包
   - cache-loader 缓存 位置 node_modules/.cache/cache-loader
 - plugin
    - html-webpack-plugin js,注入html
    - clean-webpack-plugin 清空dist
    - speed-measure-webpack-plugin 
    - IgnorePlugin 防止在 import 或 require 调用时，生成以下正则表达式匹配的模块
    - webpack-bundle-analyzer 构建结果依赖分析
    - optimize-css-assets-webpack-plugin  压缩css
    - terser-webpack-plugin 压缩js
    - purgrecss-webpack-plugin 清空无用css
  - babel （为了让webpack.config.js臃肿，，吧babel配置提取出来）配置文件 .babelrc.js, 对于在提案阶段的语法使用的时候，需要安装并使用插件
    - bable-loader es6--->es5
    - @babel/core Babel编译核心包
    - @babel/preset-env 编译预设
    - @babel/preset-flow
    - @babel/preset-react
    - @babel/prest-typescript
  - sourceMap bundle映射源码，反向定位到源码位置 devtool: "source-map".....,有很多值可选，主要目的：打包是否生成source-map、source-map是否引入，（inline（内链）、eval形式执行代码），不引入，错误定位，（精确定位，行定位）
  - sourceMap 原理，sourcemap是一个文件，里面保存着每个文件，每个代码的位置信息，通过一套映射机制实现code --- buildcode 间的映射
  - webpack文件缓存策略 文件后缀名+hash.xxx [name].[path].[folder].[hash（每次构建生成的唯一 hash 值）].[chunkhash（文件的改动只会影响其所在 chunk 的 hash 值；）].[contenthash（每个文件都有单独的 hash 值，文件的改动只会影响自身的 hash 值；）].[ext(文件名)]
  - resolve 
    - alias 别名配置
    - extensions 文件后缀名省略 ['.js','...'(保留默认)]
    - modules 告诉 webpack 解析模块时应该搜索的目录
  - externals 从输出的 bundle 中排除依赖
## webpack loader，plugin思想，怎么实现事件调用和广播(tapable)

## wepack和vite的区别
vite使用浏览器es module能力，浏览器（入口）需要（import 什么）什么，就返回什么，需要预打包，把不是es module模块npm包包装成es module
webpack全量打包，提前编译所有模块es6--》es5，构建，hmr过久（项目过大），分析、转换、编译、输出
webpack依赖
{
  'app.js':{
    dependencies:{'a.js','b.js'},
    code: 'console.log(1+2)'
  }
}

## vite原理
```js
// "<script type="module" src="main.js">"

// main.js
import a from 'a.js'
a();
```
浏览器记载main.js后，根据js内容，分析知道它import 了a.js 会请求对应a.js,
vite做的劫持浏览器，找到对应node_module下文件，返回，
为什么要劫持，举例：import react form 'react
浏览器端的请求回事 http://localhost:3000/react,项目里面没有这个文件，所以需要进行劫持所以，
劫持处理怎么设计实现的，应该会用esbuild进行预打包，这一步还会处理修改输出文件的import ，例如 import moment form ’moment‘ ---》 import moment from '@/modulus/monent' 便于通过flag区分
为什么比webpack快？少了打包编译过程
esbuid 使用go编写，比nodejs编写的打包器快
vite开发服务器，HMR,源码更新，仅仅让这一个文件失效，让浏览器重新请求即可，其他npm包使用强缓存在浏览器，提速开发

缺点：
生态不如webpack
prod环境构建，目前用的Rollup，原因在于esbuild对于css和代码分割不是很友好
<!-- 还没接受市场考验 -->
## babel能力
工具链，兼容es5，
基础能力：语法转换
es6-->es5：针对语法糖，新的api(xx.include,padStart)需要polyfill,core-js做垫片处理
 - 根据你的配置做语法糖解析，转换
 - 根据你的配置塞入垫片polyfill
plugin：可自己开发
 - 语法插件/转换插件
presets: 预设
## node服务器发生性能问题如何定位及解决
1.定位问题
2.解决问题
3.性能监控
------ 网上答案 esay-monitor + ab命令
## 如何压测ssr页面
- ab 命令,locust, jmeter,go
制定一种压测计划，压测条件，通过一种压测工具（常见ab命令），对测试页面进行，通过对ssr服务器接入监控模块，压测结束查看耗时较多的页面/接口
通过分析代码进行优化（easy-monitor可以统计出耗时函数list，针对耗时考前的进行优化），
后续应该建立/接入性能监控报警机制、建立备用机、接入一些简单的防御系统（ddos）
## esmodule 和cjs的区别
1.使用方式，引入/导出
2.esm输出“值的引用”，cjs输出“值的拷贝”
3.esm编译时输出接口，cjs输出运行时加载
4.cjs同步加载，esm异步加载

## set 和 map的区别
- set
  - 类似数组，里面的值都是唯一的,允许存储任何形式的唯一值，NaN和undefined都可以被存储在Set 中， NaN之间被视为相同的值
  - 常用api：get,set,add,clear,delete
+0 与 -0 在存储判断唯一性的时候是恒等的，所以不重复
undefined 与 undefined 是恒等的，所以不重复
NaN 与 NaN 是不恒等的，但是在 Set 中认为NaN与NaN相等，所有只能存在一个，不重复。
作用：数组去重，交集，差集
```js
let set = new Set([-0,+0, undefined, undefined, NaN,NaN]) // Set(3) {0, undefined, NaN}
```
- map
  - 构造函数，参数二位数组（let map=new Map([['js','react']])）类似对象，key-value集合，键的形式不限于字符串，也不能放重复项,

map 中的键是有序的，对象中的键则不是
size获取key个数
## promise原理
```js
const p = new Promise((res,rej)=>{
  res(1)
  // rej(2)
}).then(function onResolve(val){
  //val: 1
}, function onReject(e){
  //e:2
}).catch(e=>{
  // e: 2
})
```
- 什么是promise
  - es6的一种新的类型，有三种状态，pending/resolve/reject，状态是单向变化不可
  - 接受一个函数参数,里面有（res,rej）两个func来变换状态
## promise 和 async/await的区别
- async/await建立在promise上，不能用于普通回掉
- 写法优雅
- async/await看起来像同步

## redux 设计思想
state,action,reducer
store :存储state库
action: 通过dispatch 触发修改state动作
reducer：接受修改state的type，修改数据返回心的state
数据单一流动，不可手动直接修改，不许通过dispatch处罚reducer修改
采用发布订阅模式，单一流动行保证了数据可回述对测试友好

中间件
常用：redux-thunk , redux-saga


## ts
- 说说什么是泛型

## 微任务/宏任务
任务queue，宏queue，微queue
第一次：任务queue，中产生的宏、微任务分别进入各自队列
微任务优先级大于宏任务
微任务为空，再支持宏任务
微任务中入队的微任务回继续执行
宏任务中产生的微任务,会再次进入微任务队列执行
每次执行完一个宏任务，都会监测微任务队列是否为空，不为空，则执行微任务
总结：js执行过程中，产生的微任务、宏任务，分别进入到各自的任务队列，单主线程为空，优先执行微任务队列到空（微任务产生的微任务回继续入队，继续执行），微任务为空后，然后执行宏任务，每执行一个宏任务，都会监测微任务队列是否为空（不会空，回跳转执行微任务），微任务队列为空后，再次执行宏任务
- 宏
  - setTimeout
  - setInterval
  - MessageChannel 建立一个通信通道，给port1，和port2 提供通行
    - let {port1,port2} = new MessageChannel();
  - I/O,事件队列
  - setImmediate 需要长时间运行的操作放在一个回调函数里，在浏览器完成后面的其他语句后，就立刻执行这个回调函数。
  - script
- 微
  - requestAnimationFrame
  - MutationObserve 监听dom数更改
  - Promise.[then/catch/finally]
  - process.nextTick
  - queueMicrotask <https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_DOM_API/Microtask_guide>

## node异步任务
<https://juejin.cn/post/6844903590977355790>

## gunt

## gulp

## 组合继承

## https/tcp/ssl3次握手，4次挥手

## 数据
 - 跨域问题
 - 会不会阻赛页面render
 - 选择最小的请求实体
 - 减少不必要的服务器响应


## js编译过程
词法分析; 语法分析; AST，代码生成; 预编译; 解释器引擎执行


<!-- a().b().c() -->
```js
```

## vue and react的区别

## 构造函数
为了防止构造function 没有使用new 调用
1.使用“use strict”
2.在构造function 内部判断
如果构造函数内部有return语句，而且return后面跟着一个对象，new命令会返回return语句指定的对象；否则，就会不管return语句
```js
function A(){
  if(!(this instanceOf A)){
    return new A()
  }
}
function myNew(parent){
  let obj = Object.create(null);
  obj.__proto__ = parent.prototype;

  const fn = Symbol();
  obj[fn] = parent;

  obj[fn]();
  delete obj[fn]
  return obj;
}

function _new(constructor, params){
  const args = [].slice.call(arguments);
  const constructor = args.shift;

  const context = Object.create(constructor.prototype);

  const result = constructor.apply(context, args)

  return (typeOf result === 'object' && result !== null) ? result : context;
}

function _create(o){
  function F(){}
  F.prototype = o;
  return new F();
}


```


## 前端工程化
- 代码规范js，css，自动格式化
- 提交规范
- 提交触发规范检测（husky）
- 版本分支管理（如何定义开发分支，发布分支，主分支，特性分支。。。。）
- code merge ---》 需要触发一个code reviewer执行review，需要一种通知机制
- 流水线，ci/cd持续集成
- 前端监控 错误监控、性能监控
- dan yuan

## git flow 流


