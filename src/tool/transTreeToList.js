
function transTreeToList(tree) {
  var res = []
  if (!(tree instanceof Array)) { throw new Error('此处树对象的最外层默认为列表') }
  for (var item of tree) {
    res.push(item)
    if (item.children instanceof Array) {
      res = [...res, ...transTreeToList(item.children)]
    }
  }
  return res
}

export default transTreeToList
