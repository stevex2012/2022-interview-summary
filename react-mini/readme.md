react render 
jsx 语法 --> babel 转换成 React.createElement()
16之前。每个组件都会使用对象vnode的形式表示
```js
{
  type, // div, span,a
  props:{
    children,
    onClick,
  }
}
```
生成一个巨大的vnode，通过深度优先遍历，根据type动态使用createElement创建dom,使用appendChild不停王dom里面扔child，递归实现，
如果层级过深会导致，js运行时间过长，长时间占用导致页面出现卡顿情况
react16后
react采用了fiber架构，主要作用使react的更新/渲染/其他可以实现可中断/可优先级调用
fiber 吧 create vnode 和 commit阶段分开