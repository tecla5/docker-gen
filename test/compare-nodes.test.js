import test from 'ava'
var {
  compareAll,
  createCompareNode,
  createNodeMatcher,
  isSame,
  prepareNode,
  prepareNodes,
  resolveMatch,
  findDeleted
} = require('../commits/compare')
var nodes = require('../fixtures/file-compare')

function pretty(obj) {
  return JSON.stringify(obj, null, 2)
}

test('isSame', t => {
  let node = nodes.first[0]
  let matchNode = nodes.mix[0]
  let result = isSame(node, matchNode)
  t.not(result, 'not same')
})

test('prepareNode', t => {
  let node = nodes.first[0]
  let prepared = prepareNode(node)
  t.is(prepared.hashCode, 'ef73b992e3e6655855de2223408fc335', 'hashcode')
})

test('prepareNodes', t => {
  let list = nodes.first
  let prepared = prepareNodes(list)
  t.is(prepared[0].hashCode, 'ef73b992e3e6655855de2223408fc335')
  t.is(prepared[1].hashCode, 'b10a8db164e0754105b7a99be72e3fe5')
})

test('resolveMatch: same', t => {
  let node = nodes.first[0]
  let matchNode = nodes.new[0]
  let result = resolveMatch({
    node,
    matchNode
  })
  t.is(result.type, 'same')
})

test('resolveMatch: modified', t => {
  let node = nodes.first[1]
  let matchNode = nodes.modified[1]
  let result = resolveMatch({
    node,
    matchNode
  })
  t.is(result.type, 'modified')
})

test('createCompareNode: same', t => {
  let list = nodes.first
  let other = nodes.new[0]
  let compareNode = createCompareNode(list)
  let result = compareNode(other)
  t.is(result.type, 'same')
})

test('createCompareNode: modified', t => {
  let list = nodes.first
  let other = nodes.modified[1]
  let compareNode = createCompareNode(list)
  let result = compareNode(other)
  t.is(result.type, 'modified')
})

test('createNodeMatcher: same', t => {
  let node = nodes.first[0]
  let nodeMatcher = createNodeMatcher(nodes.first)
  let same = nodes.new[0]
  let result = nodeMatcher(same)
  t.is(result.filePath, node.filePath)
  t.is(result.data, node.data, 'data is same')
  t.is(result.hashCode, node.hashCode, 'hashcode is same')
})

test('createNodeMatcher: not same', t => {
  let node = nodes.first[1]

  let nodeMatch = createNodeMatcher(nodes.modified)
  let other = nodes.modified[1]

  let result = nodeMatch(other)

  // let compareList = nodes.modified
  // let attrib = 'filePath'
  // let found = compareList.find(compareNode => compareNode[attrib] === node[attrib])
  // result = found

  t.is(result.filePath, node.filePath)
  t.not(result.data, node.data, 'data not same')
  t.not(result.hashCode, node.hashCode, 'hashcode not same')
})

// Should return
// {
//     filePath: 'app/services/my-addition/Readme',
//     data: 'Hello World'
//   }
test('findDeleted', t => {
  let node = nodes.first[1]
  let compareList = nodes.deleted
  let nodeMatch = createNodeMatcher(compareList)
  let deleted = findDeleted(nodes.first, nodeMatch)[0]
  t.is(deleted.filePath, 'app/services/my-addition/Readme')
})

test('compareAll', t => {
  let result = compareAll(nodes.first, nodes.mix)
  console.log('ops', pretty(result))

  t.is(result[0].type, 'new')
  t.is(result[1].type, 'modified')
  t.is(result[2].type, 'deleted')
})