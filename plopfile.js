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
    this.opts = opts
    this.dirs = {}
    this.files = {}
  }

  async fileExists(filePath) {
    return await this.files[filePath]
  }
  async makeDir(dirPath) {
    return await this.dirs[dirPath]
  }
  async writeFile(filePath, data) {
    let lastWritten = {
      filePath,
      data
    }
    this.files[filePath] = lastWritten
    this.lastWritten = lastWritten
  }

  toString() {
    return this.lastWritten.filePath
  }
}

function createVirtualFileSystem(opts) {
  return new VirtualFileSystem(opts);
}

module.exports = (plop, opts = {}) => {
  let inputsPath = opts.inputs || './fixtures/single-service'
  let data = require(inputsPath)
  data = Object.assign(data, {
    root: opts.root || 'app',
    fsys: createVirtualFileSystem(opts)
  })

  actions.list = actions.list.concat(customActions(data, opts))
  let plopConfig = require('./plop-config')(data, actions)

  // We declare a new generator called "module"
  let generator = plop.setGenerator('docker', plopConfig);
};