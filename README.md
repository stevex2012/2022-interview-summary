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
webpack是一个川行模块打包器，一切皆模块，build过程中会广播很多事件（切片编程思想），loader处理非js文件，plugin控制输出内容，
 - 打包流程
   - 初始化参数，执行run func，根据入口文件，分析每个文件的依赖文件，构建依赖map，调用loader处理不同类型文件，调用plugin修改输出内容

## webpack loader，plugin思想，怎么实现事件调用和广播

## wepack和vite的区别

## vite原理