'use strict';

var argv = require('yargs-parser')(process.argv.slice(2));
var App = require('templates');
var suite = require('base-test-suite');
var Runner = require('./');
var runner = new Runner(App, argv);

// runner.addFile('actual/app.create.js');
runner.addFiles(suite.test.templates);
runner.run();
