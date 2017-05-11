var fs = require('fs-extra')
var path = require('path')
var actions = require('./actions')

function copyFolder(root, dir) {
  return async function copyNats() {
    let srcPath = path.resolve(__dirname, dir)
    let targetPath = path.resolve(root, dir)
    try {
      await fs.copy(srcPath, targetPath)
      return `copied ${srcPath} to ${targetPath}`
    } catch (err) {
      console.error(err)
      return `error on copy ${srcPath}`
    }
  }
}

// custom actions
function customActions(data, opts = {}) {

  return [
    copyFolder(data.root, 'nats'),
    copyFolder(data.root, 'api')
  ]
}

module.exports = (plop, opts = {}) => {
  let inputsPath = opts.inputs || './fixtures/single-service'
  let data = require(inputsPath)
  data = Object.assign(data, {
    root: opts.root || 'app'
  })


  let list = actions.list.concat(customActions(data, opts))
  // console.log('list', list)

  // We declare a new generator called "module"
  plop.setGenerator("module", {

    // Succintly describes what generator does.
    description: "Create a new module",

    // Get inputs from the user.
    // That's Inquirer.js doing the job behind the hood.
    inputs: (config) => {
      // console.log('data', data)
      return data
    },

    // List of actions to take.
    // Here we "add" new files from our templates.
    actions: {
      list,
      item: actions.item
    }
  });
};