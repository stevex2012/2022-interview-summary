# 面试总结（查缺补漏）


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
 - plugin
    - html-webpack-plugin js,注入html
    - clean-webpack-plugin 清空dist
    - speed-measure-webpack-plugin 
    - IgnorePlugin 防止在 import 或 require 调用时，生成以下正则表达式匹配的模块
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
## webpack loader，plugin思想，怎么实现事件调用和广播

## wepack和vite的区别

## vite原理

## babel能力