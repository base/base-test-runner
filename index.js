'use strict';

var fs = require('fs');
var path = require('path');
var Mocha = require('mocha');
var Emitter = require('component-emitter');
var File = require('vinyl');

function Runner(App, options) {
  if (!(this instanceof Runner)) {
    return new Runner(App, options);
  }
  this.options = options || {};
  this.mocha = new Mocha();
  var self = this;
  if (this.options._ && this.options._.length) {
    this.re = toRegex(this.options._[0]);
  }
  this.mocha.suite.on('require', function(fn, filename, mocha) {
    if (typeof fn === 'function') {
      fn(App, self.options, self);
    }
  });
}

Emitter(Runner.prototype);

Runner.prototype.addFile = function(file) {
  this.mocha.addFile(file);
  return this;
};

Runner.prototype.addFiles = function(dir) {
  var files = fs.readdirSync(dir);
  for (var i = 0; i < files.length; i++) {
    var file = path.resolve(dir, files[i]);
    if (this.re && !this.re.test(files[i])) {
      continue;
    }
    if (/\.js$/.test(file)) {
      this.emit('file', new File({path: file, cwd: dir}));
      this.addFile(file);
    }
  }
  return this;
};

Runner.prototype.run = function(fn) {
  return this.mocha.run(fn);
};

function toRegex(str) {
  str = str.split('*').join('.*?');
  return new RegExp(str.split('.').join('\\.'));
}

/**
 * Expose `Runner`
 */

module.exports = Runner;
