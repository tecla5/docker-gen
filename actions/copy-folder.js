var fs = require('fs-extra')
var path = require('path')

module.exports = function copyFolder(root, dir) {
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