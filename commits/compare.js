var md5 = require('md5')

function createNodeMatcher(list, attrib = 'name') {
  return function nodeMatch(node) {
    list.find(compareNode => compareNode[attrib] === node[attrib])
  }
}

function prepareNode(node) {
  node.hashCode = node.hashCode || md5(node.data)
  return node
}

function prepareNodes(...nodes) {
  nodes.map(node => prepareNode(node))
}

function createCompareNode(compareList) {
  const nodeMatch = createNodeMatcher(compareList)

  function isSame(node, matchNode) {
    prepareNodes(node, matchNode)
    return matchNode.hashCode === node.hashCode
  }

  return function compareNode(node) {
    let matchNode = nodeMatch(node)
    if (matchNode) {
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
  prepareNode
}