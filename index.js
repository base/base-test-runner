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

Runner.prototype.addFile = function(name, fp) {
  if (!this.match(fp)) return;
  var file = new File({path: fp});
  this.emit('file', file);
  this.emit(name, file);
  this.files.push(fp);
  return this;
};

Runner.prototype.addFiles = function(name, dir) {
  var files = fs.readdirSync(dir);
  for (var i = 0; i < files.length; i++) {
    this.addFile(name, path.resolve(dir, files[i]));
  }
  return this;
};

Runner.prototype.match = function(file) {
  if (!/\.js$/.test(file)) return false;
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
