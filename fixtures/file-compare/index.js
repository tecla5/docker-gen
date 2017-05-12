module.exports = {
  empty: [],
  first: [{
    filePath: 'app/services/my-addition/.babelrc',
    data: '{\n  "presets": ["env"],\n  "plugins": ["transform-runtime"]\n}\n'
  }, {
    filePath: 'app/services/my-addition/Readme',
    data: 'Hello World'
  }],
  // removed Readme
  deleted: [{
    filePath: 'app/services/my-addition/.babelrc',
    data: '{\n  "presets": ["env"],\n  "plugins": ["transform-runtime"]\n}\n'
  }],
  // es2015
  // Goobye
  modified: [{
    filePath: 'app/services/my-addition/.babelrc',
    data: '{\n  "presets": ["es2015"],\n  "plugins": ["transform-runtime"]\n}\n'
  }, {
    filePath: 'app/services/my-addition/Readme',
    data: 'Goodbye World'
  }],
  new: [{
    filePath: 'app/services/my-addition/.babelrc',
    data: '{\n  "presets": ["env"],\n  "plugins": ["transform-runtime"]\n}\n'
  }, {
    filePath: 'app/services/my-addition/Readme',
    data: 'Hello World'
  }, {
    filePath: 'app/services/my-addition/demo.txt',
    data: 'New Text demo'
  }],
  // removed first
  // Goodbye
  // new = txt file
  mix: [{
    filePath: 'app/services/my-addition/Readme',
    data: 'Goodbye World'
  }, {
    filePath: 'app/services/my-addition/demo.txt',
    data: 'New Text demo'
  }],
}