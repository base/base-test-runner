# base-test-runner [![NPM version](https://img.shields.io/npm/v/base-test-runner.svg?style=flat)](https://www.npmjs.com/package/base-test-runner) [![NPM downloads](https://img.shields.io/npm/dm/base-test-runner.svg?style=flat)](https://npmjs.org/package/base-test-runner) [![Build Status](https://img.shields.io/travis/jonschlinkert/base-test-runner.svg?style=flat)](https://travis-ci.org/jonschlinkert/base-test-runner)

Test runner for base projects.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install base-test-runner --save
```

## Usage

```js
var argv = require('yargs-parser')(process.argv.slice(2));
var runner = require('base-test-runner')(argv);

// pass your `App` to the test runner
runner.on('file', function(file) {
  require(file.path)(require('base'));
});
```

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/base-test-runner/issues/new).

## Building docs

Generate readme and API documentation with [verb](https://github.com/verbose/verb):

```sh
$ npm install verb && npm run docs
```

Or, if [verb](https://github.com/verbose/verb) is installed globally:

```sh
$ verb
```

## Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

## Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2016, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT license](https://github.com/jonschlinkert/base-test-runner/blob/master/LICENSE).

***

_This file was generated by [verb](https://github.com/verbose/verb), v0.9.0, on May 24, 2016._