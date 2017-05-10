# Docker Micro Services generator

Generate a fully configured Docker Micro Services from a node-red project with [sub-match](https://github.com/tecla5/node-red/tree/master/nodes/service) nodes for [hemera](https://github.com/hemerajs) or [seneca](http://senecajs.org/) based services (using message publish/subscribe and pattern matching).

Such a Docker project can in turn be (re)-imported into node-red via [node-red-import](https://github.com/tecla5/node-red-import)

## Plop

See [plop](http://www.nicoespeon.com/en/2015/11/plop-micro-generator-boilerplate-yeoman-alternative/)

### Install plop binary

Install plop binary globally

`npm install -g plop`

### Docker compose

Using Docker Compose [v3 schema](https://github.com/aanand/compose-file/blob/master/schema/data/config_schema_v3.0.json)

Deploy swarm mode

```yaml
  deploy:
    mode: replicated
    replicas: 2
    labels: [APP=VOTING]
    placement:
      constraints: [node.role == worker]
```

### Run

Generate an `./app` Docker project for hemera

`npm start`

Removes any existing `./app` folder and generate a new one!

You can also pass options ([minimist](https://www.npmjs.com/package/minimist) way) like this:

```bash
$ plop -l xa -s
[SUCCESS] add /app/docker-compose.yml
```

The plopfile main function (see below) will then be passed this `opts` argument: `{l: 'xa', s: true }`
This can fx be used to customize the inputs file used, to override the default

```bash
$ plop -inputs fixtures/custom
[SUCCESS] add /app/docker-compose.yml
```

### Troubleshooting

ERROR: `[FAILED] add File already exists`

Try removing the generated `app` folder

`$ rm -rf app`

### plopfile.js

The `plopfile.js` is used to define the inputs and how to generate the resulting Docker Micro Services project.

For development the inputs are currently hardcoded to be loaded from a file, but could also make an async call to a web service (exposed by `node-red`) to get the node data in the format required.

```js
module.exports = (plop, opts = {}) => {
    let inputsPath = opts.inputs || './fixtures/single-service'
    let data = require(inputsPath)
    // ...
    inputs: (config) => {
      return data
    },
```

The actions are specified using simple *plop* action format with handlebars helpers.

```js
// List of actions to take.
// Here we "add" new files from our templates.
actions: {
  list: [{
      type: "add",
      path: "app/services/{{dashCase name}}/.babelrc",
      templateFile: "plop-templates/babelrc.tpl"
    }, {
    // ...
    }],
  item: [{
    type: "add",
    path: "app/docker-compose.yml",
    templateFile: "plop-templates/docker-compose.yml.tpl"
  }]
  }
}
```

## TODO

Add labels to conform with [node-red-import](https://github.com/tecla5/node-red-import)

## License

ISC