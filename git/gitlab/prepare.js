var diff = require('../../fixtures/mix-diff.json')

function toAction(diff) {
  let type = diff.type
  switch (type) {
    case 'new':
      return 'create'
    case 'modified':
      return 'update'
    case 'deleted':
      return 'delete'
    default:
      throw Error(`Unknown diff type ${type}`)
  }
}

function toGitLabActions(diff) {
  let action = toAction(diff)
  let file_path = diff.filePath
  let commitAction = {
    action,
    file_path
  }
  if (action !== 'delete') {
    commitAction.content = diff.data
  }
  return commitAction
}

function prepareActions(diff) {
  return diff.map(toGitLabActions)
}

module.exports = {
  prepareActions,
  toGitLabActions,
  toAction
}