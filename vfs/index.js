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

module.exports = createVirtualFileSystem