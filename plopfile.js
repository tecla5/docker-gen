var actions = require('./actions')

// custom actions
function customActions(data, opts = {}) {
  function copyNats() {
    // copy nats folder
    console.log('TODO: copy /nats folder to:', data.root)
    return 'copied nats'
  }
  function copyApi() {
    // copy nats folder
    console.log('TODO: copy /api folder to:', data.root)
    return 'copied api'
  }

  return [
    copyNats,
    copyApi
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