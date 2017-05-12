var md5 = require('md5')

function createNodeMatcher(list, attrib = 'filePath') {
  console.log('createNodeMatcher', list)
  return function nodeMatch(node) {
    return list.find(compareNode => compareNode[attrib] === node[attrib])
  }
}

function prepareNode(node) {
  if (!node.data) {
    console.error('bad', node)
    throw Error('Node must have data to hash')
  }
  node.hashCode = node.hashCode || md5(node.data)
  return node
}

function prepareNodes(nodes) {
  return nodes.map(node => prepareNode(node))
}

function isSame(node, matchNode) {
  prepareNodes([node, matchNode])
  return matchNode.hashCode === node.hashCode
}

function createCompareNode(compareList) {
  const nodeMatch = createNodeMatcher(compareList)

  return function compareNode(node) {
    let matchNode = nodeMatch(node)
    let pair = {
      node,
      matchNode
    }
    if (matchNode) {
      console.log('matchNode found', pair)
      if (isSame(node, matchNode)) {
        // same node
        return {
          type: 'same',
          node
        }
      } else {
        // modified node
        return {
          type: 'modified',
          prev: matchNode,
          node
        }
      }
    } else {
      console.log('no matchNode found for', pair)
      // new node
      return {
        type: 'new',
        node
      }
    }
  }
}

function compareAll(list, compareList) {
  var compareNode = createCompareNode(compareList)
  let ops = list.map(node => compareNode(node))

  const nodeMatch = createNodeMatcher(list)
  let deleted = compareList.reduce((acc, node) => {
    nodeMatch(node) ? acc.push(node) : undefined
    return acc
  }, [])

  console.log('Comparison', {
    ops,
    deleted
  })
  return {
    ops,
    deleted
  }
}

module.exports = {
  compareAll,
  createCompareNode,
  createNodeMatcher,
  isSame,
  prepareNode,
  prepareNodes
}