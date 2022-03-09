// 广度优先遍历
function log(...rest){
  console.log(rest)
}
var pNode = document.querySelector('.parent');
// 递归
function bfs1(node, nodeList = []) {
  if(node){
    let tmpList = []
    if(!nodeList.includes(node)){
      nodeList.push(node)
    }else{
      // return nodeList
    }
    const children = node.children;
    Array.from(children).forEach(item=>{
      nodeList.push(item)
      tmpList.push(item)
    })
  }
  // log(nodeList[1])
  // bfs1(nodeList[1],nodeList)
  return nodeList;
}
log(bfs1(pNode))
// 非递归
function bfs2(node, nodeList = []) {
  const stack = []
  if(node){
    stack.push(node)
    while(stack.length){
      const currentNode = stack.shift();
      nodeList.push(currentNode);
      const children = currentNode.children;
      for(let i = 0;i<children.length;i++){
        stack.push(children[i])
      }
    }
  }
  return nodeList;
}
// log(bfs2(pNode))
