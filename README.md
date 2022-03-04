# 面试总结（查缺补漏）

## 自我介绍
面试官好
- 个人基本信息：我叫shiquan，17年初从事前端开发，目前有5年的前端开发经验
- 公司经历：
  在5年开发生涯中，服务过3家公司，
  第一家：长安股份有限公司，主要工作是长安商场相关业务开发，技术站butterfly(jq+backbone)实现，主要有3端pc/h5/app（cordova+webview）小程序端，车和美商场数据看版。后期h5 迁移到react（基于react的官方脚手架）
    成长点：商场活动页面生成器，node+react，业务痛点：每次开发流程，都是手动切页面+静态布局+定位按钮（跳转商成页面），吧压缩给运营，低效、大量重复工作，
    当时自学了node，觉得可以通过fs模块实现文件的生成
      第一版：使用node写了脚本，第一版流程，切好图片，在图片文件下执行脚本文件，生成静态页面，缺点：需要二次开发，添加跳转按钮
      第二版：node+express+react开发一个生产页面，手动切片，按序上传，定义每个图片为一个楼层，每层可以添加按钮，拖动定位，按钮可以配置基本属性，配置完成后上传数据到express服务器，生成静态页面。文件可下载。缺点：需要通过ps手动切图片
      第三版：使用canvas切割图片。缺点：后期发现图片过大，导致请求实体过大，请求失败，需要改进成数据切片分步上传。每次都需要下载，没有和运营服务器打通，直接替换文件
  第二家：firmoo跨境电商，主要负责商城的日常迭代和前端性能优化，技术栈：nextjs
    成长点：
      页面lighthouse得分，60---》90左右
      你都做了哪些优化点：
        1.使用svg替换图片图标
        2.添加webpack plugin 打包过程，去掉无效css
        3.通过脚本工具合并公共css
        4.增加cdn，把不同静态资源，发在不同域名下面
        5.给公共文件，增加强缓存
        6.使用异步加载组件，主要针对在首屏外的内容
        7.把首屏分必要接口数据通过异步加载，减少服务端请求
        8.建立监控机制：每周通过网站测试网页在不同国家的打开得分。缺点：需要手动测试，没有建立一个自动化的性能监控平台
      页面片段生成器：
  第三家：腾讯全资子公司-云智，技术栈：react开发tob后台管理页面，tarojs开发小程序
- 特长
- 爱好

## 每家公司的成长点
## 详细说明自己的优点 
  - 页面性能优化（列出来）
  - 重复工作工具话（页面生成工具需要详细说清楚，下来多练习）


## react 
  - 相关面试题
  - 16之前和之后的区别（fiber）
    - 16之前，更新dom操作，一气呵成，dom层级过深，过大，导致浏览器卡顿，无法实时响应，
    - 16fiber架构，借用操作系统协同调度思想，把页面的操作（点击，加载资源，执行脚本，。。。分成不同优先级任务，让这个过程变得可中断），实现根据任务优先级切切片调用，在必要的时，让出控制权
  - 源码
  - hook实现及源码，为什么不能条件语句中执行
  - react hook 为什么不能在条件/循环语句中使用
    - hook在函数组件（fcmp）中使用，fcmp是无状态，想要做到状态控制，需要一个必包保存fcmp中的hooks（状态），而react中采用的是一个单向链表保存fcmp中的调用顺序，fcmp中每一个hook的使用，会按照实行顺序链接到单向链表上，如果使用条件/循环，那么链表的上对应顺序就混乱，增加bug风险
  - react组件性能监控方案（hoc）
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

## node服务器发生性能问题如何定位及解决

## 如何压测ssr页面