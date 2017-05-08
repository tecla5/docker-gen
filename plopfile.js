let data = require('./fixtures/single-service')

module.exports = (plop) => {

  // We declare a new generator called "module"
  plop.setGenerator("module", {

    // Succintly describes what generator does.
    description: "Create a new module",

    // Get inputs from the user.
    // That's Inquirer.js doing the job behind the hood.
    inputs: (config) => {
      return data
    },

    // List of actions to take.
    // Here we "add" new files from our templates.
    actions: [{
        type: "add",
        path: "app/modules/{{camelCase name}}.js",
        templateFile: "plop-templates/module.js"
      },
      {
        type: "add",
        path: "app/tests/{{camelCase name}}.tests.js",
        templateFile: "plop-templates/module.tests.js"
      }
    ]

  });

};