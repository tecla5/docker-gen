var md5 = require('md5')

function createNodeMatcher(compareList, attrib = 'filePath') {
  return function nodeMatch(node) {
    return compareList.find(compareNode => compareNode[attrib] === node[attrib])
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

// TODO: move
function resolveMatch({
  node,
  matchNode
}) {
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
}

function newNode(node) {
  // new node
  return {
    type: 'new',
    node
  }
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
      return resolveMatch(pair)
    } else {
      return newNode(node)
    }
  }
}

function findDeleted(compareList, nodeMatch) {
  return compareList.reduce((acc, node) => {
    let matchNode = nodeMatch(node)
    if (!matchNode) {
      acc.push(node)
    }
    return acc
  }, [])
}

function deletedNodes(list) {
  return list.map(node => {
    return {
      type: 'deleted',
      node: node
    }
  })
}

function compareAll(list, compareList) {
  var compareNode = createCompareNode(compareList)
  let ops = list.map(node => compareNode(node))

  const nodeMatch = createNodeMatcher(compareList)
  let deleted = findDeleted(list, nodeMatch)

  // const nodeMatch = createNodeMatcher(list)
  // let deleted = findDeleted(compareList, nodeMatch)
  if (deleted) {
    ops = ops.concat(deletedNodes(deleted))
  }
  return ops
}

module.exports = {
  compareAll,
  createCompareNode,
  createNodeMatcher,
  isSame,
  prepareNode,
  prepareNodes,
  resolveMatch,
  findDeleted
}