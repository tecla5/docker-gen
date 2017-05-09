# Docker Micro Services generator

## Plop

See [plop](http://www.nicoespeon.com/en/2015/11/plop-micro-generator-boilerplate-yeoman-alternative/)

### Install plop binary

Install plop binary globally

`npm install -g plop`

### Run

`plop`

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

The actions are specified using simple *plop* action format with handleBars helpers.

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


}
```

## TODO

Finish it!

## License

ISC