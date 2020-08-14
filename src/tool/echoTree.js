// props包含 {value:'id',label:'name',children:'children'}
// 默认参数形式
function echoTree(tree, arr, props = { value: 'id', label: 'name', children: 'children' }) {
  if (arr.length === 0) { return [] } else {
    let node = tree.find(item => {
      if (item[props.value] === arr[0]) {
        return true
      }
    })
    if (!node) {
      throw new Error(`错误，未找到节点${arr[0]}`)
    }
    return [node].concat(echoTree(node[props.children], arr.slice(1), props))
  }
}
// 门店类型的回显
function echoShopCat(tree, arr, props = { value: 'catId', label: 'catName', children: 'children' }) {
  let nodeList = echoTree(tree, arr, props)
  let labelList = nodeList.map(item => {
    return item[props.label]
  })
  return labelList.join(' / ')
}

export default echoTree
export { echoShopCat }
