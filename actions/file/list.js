module.exports = [{
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
]