// custom actions
function copyNats() {
  // copy nats folder
  console.log('TODO: copy /nats folder')
  return 'copied'
}

module.exports = (plop, opts = {}) => {
  let inputsPath = opts.inputs || './fixtures/single-service'
  let data = require(inputsPath)
  // We declare a new generator called "module"
  plop.setGenerator("module", {

    // Succintly describes what generator does.
    description: "Create a new module",

    // Get inputs from the user.
    // That's Inquirer.js doing the job behind the hood.
    inputs: (config) => {
      data = Object.assign(data, {
        root: opts.root || 'app'
      })
      // console.log('data', data)
      return data
    },

    // List of actions to take.
    // Here we "add" new files from our templates.
    actions: {
      list: [
        copyNats,
        {
          type: "add",
          path: "{{root}}/services/{{dashCase name}}/.babelrc",
          templateFile: "plop-templates/babelrc.tpl"
        }, {
          type: "add",
          path: "{{root}}/services/{{dashCase name}}/.dockerignore",
          templateFile: "plop-templates/dockerignore.tpl"
        }, {
          type: "add",
          path: "{{root}}/services/{{dashCase name}}/.gitignore",
          templateFile: "plop-templates/gitignore.tpl"
        }, {
          type: "add",
          path: "{{root}}/services/{{dashCase name}}/Dockerfile",
          templateFile: "plop-templates/Dockerfile.tpl"
        }, {
          type: "add",
          path: "{{root}}/services/{{dashCase name}}/gulpfile.js",
          templateFile: "plop-templates/gulpfile.js.tpl"
        }, {
          type: "add",
          path: "{{root}}/services/{{dashCase name}}/package.json",
          templateFile: "plop-templates/{{framework}}/package.json.tpl"
        }, {
          type: "add",
          path: "{{root}}/services/{{dashCase name}}/index.js",
          templateFile: "plop-templates/{{framework}}/service.js.tpl"
        },
        {
          type: "add",
          path: "{{root}}/services/{{dashCase name}}/test/service.test.js",
          templateFile: "plop-templates/{{framework}}/service.test.js.tpl"
        }
      ],
      item: [{
        type: "add",
        path: "{{root}}/docker-compose.yml",
        templateFile: "plop-templates/docker-compose.yml.tpl"
      }]
    }
  });
};