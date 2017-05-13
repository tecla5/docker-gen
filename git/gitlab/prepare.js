function toAction(diff) {
  let type = diff.type
  console.log('toAction', {
    diff,
    type
  })
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

function toGitLabAction(diff) {
  let action = toAction(diff)
  let file_path = diff.node.filePath
  let commitAction = {
    action,
    file_path
  }
  if (action !== 'delete') {
    commitAction.content = diff.node.data
  }
  return commitAction
}

function prepareActions(diff) {
  return diff.map(toGitLabAction)
}

module.exports = {
  prepareActions,
  toGitLabAction,
  toAction
}