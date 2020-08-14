// 将机构树变为两级并增加'label,vaue'字段
export default function(tree, forOrg = false) {
  var res = []
  for (const node1 of tree) {
    var resNode1 = {}
    for (const item in node1) {
      if (item === 'children') {
        resNode1.children = []
        for (const node2 of node1.children) {
          var resNode2 = {}
          for (const jtem in node2) {
            if (jtem !== 'children') {
              resNode2[jtem] = node2[jtem]
              if (forOrg) {
                resNode2.value = node2.orgId
                resNode2.label = node2.orgName
              }
            }
          }

          resNode1.children.push(resNode2)
        }
      } else {
        resNode1[item] = node1[item]
        if (forOrg) {
          resNode2.value = node2.orgId
          resNode2.label = node2.orgName
        }
      }
    }
    res.push(resNode1)
  }
  return res
}

export function findGrandId(tree2l, pId) {
  let res
  tree2l.forEach(node => {
    if (node.children) {
      node.children.forEach(item => {
        if (item.orgId === pId) {
          res = node.orgId
        }
      })
    }
  })
  if (res) { return res } else {
    throw new Error('未找到父节点')
  }
}

export function findPath(tree, prop, id) {

}

