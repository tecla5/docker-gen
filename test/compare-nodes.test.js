import test from 'ava'
var compare = require('../commits/compare')
var nodes = require('../fixtures/file-compare')

function pretty(obj) {
  return JSON.stringify(obj, null, 2)
}

test('compare', t => {
  let result = compare(nodes.first, nodes.new)
  console.log('ops', pretty(result.ops))
  t.pass()
})