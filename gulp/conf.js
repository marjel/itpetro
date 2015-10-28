/**
 *  This file contains the variables used in other gulp files
 *  where tasks are defined
 */

var gutil = require('gulp-util');

/**
 *  The main paths of project
 */
exports.paths = {
  src: 'src',
  dist: 'dist',
  tmp: '.tmp',
  e2e: 'e2e'
};

/**
 *  Wiredep injects bower dependencies in the project
 */
exports.wiredep = {
  exclude: [/\/bootstrap\.js$/],
  directory: 'bower_components'
};

/**
 *  Common implementation for an error handler of a Gulp plugin
 */
exports.errorHandler = function(title) {
  'use strict';

  return function(err) {
    gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
    this.emit('end');
  };
};
