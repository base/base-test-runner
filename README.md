## Usage

```js
var argv = require('yargs-parser')(process.argv.slice(2));
var runner = require('base-test-runner')(argv);

// pass your `App` to the test runner
runner.on('file', function(file) {
  require(file.path)(require('base'));
});
```
