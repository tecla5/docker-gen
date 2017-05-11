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

class VirtualFileSystem {
  constructor(opts = {}) {
    this.config = {
      opts,
      dirs: {},
      files: {}
    }
  }

  async fileExists(filePath) {
    return await this.config.files[filePath]
  }
  async makeDir(dirPath) {
    return await this.config.dirs[dirPath]
  }
  async writeFile(filePath, data) {
    let lastWritten = {
      filePath,
      data
    }
    this.config.files[filePath] = lastWritten
    this.config.lastWritten = lastWritten
  }

  toString() {
    return this.config.lastWritten.filePath
  }
}

function createVirtualFileSystem(opts) {
  return new VirtualFileSystem(opts);
}

let p = require('node-plop');

async function run(opts = {}) {
  let inputsPath = opts.inputs || './fixtures/single-service'
  let data = require(inputsPath)
  data = Object.assign(data, {
    root: opts.root || 'app',
    fsys: createVirtualFileSystem(opts)
  })

  actions.list = actions.list.concat(customActions(data, opts))
  let plopConfig = require('./plop-config')(data, actions)
  console.log('p', p)

  let plop = p.nodePlop(plopConfig)
  let generator = plop.setGenerator('default', plopConfig)
  // We declare a new generator called "module"
  p.doThePlop(generator, {}, (result) => {
    console.log('result', result)
    console.log('first change', result.changes[0].vfs)
  });
};

module.exports = run