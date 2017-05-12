import test from 'ava'
var {
  compareAll
} = require('../commits/compare')
var nodes = require('../fixtures/file-compare')

function pretty(obj) {
  return JSON.stringify(obj, null, 2)
}

test('createCompareNode', t => {
  let result = createCompareNode(list)
  t.fail()
})

test('createNodeMatcher', t => {
  let result = createNodeMatcher(node)
  t.fail()
})

test('prepareNode', t => {
  let result = prepareNode(node)
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