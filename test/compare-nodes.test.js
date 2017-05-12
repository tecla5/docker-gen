import test from 'ava'
var {
  compareAll,
  createCompareNode,
  createNodeMatcher,
  isSame,
  prepareNode,
  prepareNodes
} = require('../commits/compare')
var nodes = require('../fixtures/file-compare')

function pretty(obj) {
  return JSON.stringify(obj, null, 2)
}

test('isSame', t => {
  let node = nodes.first[0]
  let matchNode = nodes.mix[0]
  console.log('compare', node, matchNode)
  let result = isSame(node, matchNode)
  t.not(result, 'not same')
})

test('prepareNode', t => {
  let node = nodes.first[0]
  let prepared = prepareNode(node)
  console.log('prepared', prepared)
  t.is(prepared.hashCode, 'ef73b992e3e6655855de2223408fc335', 'hashcode')
})

test('prepareNodes', t => {
  let list = nodes.first
  let prepared = prepareNodes(list)
  console.log('prepared', prepared)
  t.is(prepared[0].hashCode, 'ef73b992e3e6655855de2223408fc335')
  t.is(prepared[1].hashCode, 'b10a8db164e0754105b7a99be72e3fe5')
})


test('createCompareNode', t => {
  let list = nodes.first
  let result = createCompareNode(list)
  t.fail()
})

test('createNodeMatcher', t => {
  let node = nodes.first[0]
  let result = createNodeMatcher(node)
  t.fail()
})

test('compareAll', t => {
  let result = compareAll(nodes.first, nodes.mix)
  console.log('RESULT')
  console.log('ops', pretty(result.ops), {
    deleted: result.deleted
  })
  t.fail()
})