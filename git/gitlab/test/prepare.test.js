import test from 'ava'
import {
  prepareActions,
  toGitLabAction,
  toAction
} from '../prepare'

let mix = require('../../fixtures/mix-diff')

let diff = {
  mix
}

let actions = {
  created: diff.mix[0],
  modified: diff.mix[1],
  deleted: diff.mix[2]
}

// TODO: move
test('toAction', t => {
  // console.log('actions', actions)
  let res = toAction(actions.created)
  // console.log('res', res)
  t.is(res, 'create')
})

test('toGitLabActions', t => {
  let res = toGitLabAction(actions.created)
  // console.log('res', res)
  t.is(res.action, 'create')
  t.is(res.file_path, actions.created.node.filePath)
})

test('prepareActions', t => {
  let results = prepareActions(diff.mix)
  let res = results[0]
  // console.log('res', {
  //   results,
  //   res
  // })

  t.is(res.action, 'create')
  t.is(res.file_path, actions.created.node.filePath)

})