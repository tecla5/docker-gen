{
  "name": "{{ dashCase name }}",
  "version": "1.0.0",
  "description": "SenecaJS service: {{ description }}",
  "main": "index.js",
  "scripts": {
    "test": "ava",
    "start": "node index.js",
    "build": "gulp build",
    "watch": "gulp watch"
  },
  "author": "{{author}}",
  "license": "ISC",
  "dependencies": {
    "seneca-joi": "x",
    "senecajs": "x"
  },
  "devDependencies": {
    "ava": "^0.19.0",
    "babel-cli": "^6.24.0",
    "babel-plugin-transform-runtime": "^6.23.0",
    "babel-preset-env": "^1.3.1",
    "gulp": "^3.9.1",
    "gulp-babel": "^6.1.2",
    "gulp-livereload": "^3.8.1",
    "gulp-sourcemaps": "^2.4.0"
  },
  "ava": {
    "files": [
      "test/*.js"
    ],
    "source": [
      "src/**/*.{js}",
      "!build/**/*"
    ],
    "concurrency": 1,
    "failFast": true,
    "failWithoutAssertions": false,
    "tap": true,
    "powerAssert": false,
    "require": [
      "babel-register"
    ],
    "babel": "inherit"
  }
}
