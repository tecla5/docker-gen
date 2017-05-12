let p = require('node-plop');
var actions = require('./actions')
let vfs = require('./vfs')
let config = require('./config')
let copyFolder = require('./actions/copy-folder')

// custom actions
function customActions(data, opts = {}) {

  return [
    copyFolder(data.root, 'nats'),
    copyFolder(data.root, 'api')
  ]
}

async function run(opts = {}) {
  let inputsPath = opts.inputs || './fixtures/single-service'
  let data = require(inputsPath)
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