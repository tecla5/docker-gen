var path = require('path')

module.exports = (data, actions) => {
  return {
    rootPath: __dirname,
    templatesPath: __dirname, // path.join(__dirname, 'plop-templates'),
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
    actions: actions
  }
}