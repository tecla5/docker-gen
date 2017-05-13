// TODO: see plop/run.js

let p = require('node-plop');
var actions = require('../actions')
let vfs = require('../vfs')
let copyFolder = require('../actions/copy-folder')

// custom actions
function customActions(data, opts = {}) {
  return [
    copyFolder(data.root, 'nats'),
    copyFolder(data.root, 'api')
  ]
}

const rootPath = path.resolve(__dirname, '..')

function config(data, actions) {
  return {
    rootPath,
    templatesPath: rootPath,
    description: "Create docker services",

    inputs: (config) => {
      // console.log('data', data)
      return data
    },

    // List of actions to take.
    // Here we "add" new files from our templates.
    actions: actions
  }
}

async function run(data, opts = {}) {
  data = Object.assign(data, {
    root: opts.root || 'app',
    fsys: vfs(opts)
  })

  actions.list = actions.list.concat(customActions(data, opts))
  let plopConfig = config(data, actions)
  let plop = p.nodePlop(plopConfig)
  let generator = plop.setGenerator('default', plopConfig)
  // We declare a new generator called "module"
  p.doThePlop(generator, {}, (result) => {
    console.log('result', result)
    console.log('first change', result.changes[0].vfs)
  });
};

module.exports = run