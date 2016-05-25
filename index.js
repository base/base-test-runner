'use strict';

var fs = require('fs');
var path = require('path');
var File = require('vinyl');
var Emitter = require('component-emitter');

function Runner(options) {
  if (!(this instanceof Runner)) {
    return new Runner(options);
  }
  this.options = options || {};
  this.files = [];
}

Emitter(Runner.prototype);

Runner.prototype.addFile = function(file) {
  if (!this.match(file)) return;
  if (/\.js$/.test(file)) {
    this.emit('file', new File({path: file}));
    this.files.push(file);
  }
  return this;
};

Runner.prototype.addFiles = function(dir) {
  var files = fs.readdirSync(dir);
  for (var i = 0; i < files.length; i++) {
    this.addFile(path.resolve(dir, files[i]));
  }
  return this;
};

Runner.prototype.match = function(file) {
  if (!this.options.pattern) return true;
  var re = toRegex(this.options.pattern);
  return re.test(file);
};

function toRegex(str) {
  if (!str) return null;
  str = str.split('*').join('.*?');
  return new RegExp(str.split('.').join('\\.'));
}

/**
 * Expose `Runner`
 */

module.exports = Runner;
