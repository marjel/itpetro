'use strict';

var path = require('path'),
  gulp = require('gulp'),
  conf = require('./conf'),
  browserSync = require('browser-sync'),
  browserSyncSpa = require('browser-sync-spa'),
  util = require('util'),
  proxyMiddleware = require('http-proxy-middleware'),
  runSequence = require('run-sequence').use(gulp);

function browserSyncInit(baseDir, d, b) {
  let browser = b === undefined ? 'default' : b,
  debug = d === undefined ? false : true,
    routes = null;
  if(baseDir === conf.paths.src || (util.isArray(baseDir) && baseDir.indexOf(conf.paths.src) !== -1)) {
    routes = {
      '/bower_components': 'bower_components'
    };
  }

  var server = {
    baseDir: baseDir,
    routes: routes,
    index: "index.html"
  };


  browserSync.instance = browserSync.init({
    host: debug ? '127.0.0.1' : 'localhost',
    port: debug ? 63342 : 3000,
    startPath: '/',
    server: server,
    browser: browser,
    logPrefix: 'It Petro RWD',
    logLevel: debug ? 'debug' : 'info',
    logConnections: debug,
    reloadDelay: 5000,
    open: debug ? 'local' : 'external'
  });
}

browserSync.use(browserSyncSpa({
  selector: '[ng-app]'// Only needed for angular apps
}));

gulp.task('serve', ['watch'], function () {
  browserSyncInit([path.join(conf.paths.tmp, '/serve'), conf.paths.src]);
});

gulp.task('production', ['build'], function () {
  browserSyncInit(conf.paths.dist, true);
});

gulp.task('serve:e2e', ['inject'], function () {
  browserSyncInit([path.join(conf.paths.tmp, '/serve'), conf.paths.src]);
});

gulp.task('serve:e2e-dist', ['build'], function () {
  browserSyncInit(conf.paths.dist);
});

gulp.task('debug', ['watch'], function () {
  browserSyncInit([path.join(conf.paths.tmp, '/serve'), conf.paths.src], true);
});

gulp.task('serve:production', function() {
  runSequence('clean', 'production');
});

gulp.task('serve:debug', function() {
  runSequence('clean', 'debug');
});