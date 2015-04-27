//var gulp = require('gulp');
//var mocha = require('gulp-mocha');
//
//gulp.task('default', function() {
//  return gulp.src(['test/test-*.js'], { read: false })
//    .pipe(mocha({
//      reporter: 'spec',
//      globals: {
//        should: require('should')
//      }
//  }));
//
//});

/* File: gulpfile.js */

// grab our packages
var gulp   = require('gulp'),
    jshint = require('gulp-jshint');

// define the default task and add the watch task to it
gulp.task('default', ['watch']);

// configure the jshint task
gulp.task('jshint', function() {
  return gulp.src('lib/**/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish'));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
  gulp.watch('lib/**/*.js', ['jshint']);
});
