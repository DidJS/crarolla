var gulp = require('gulp');
var angularFilesort = require('gulp-angular-filesort');
var inject = require('gulp-inject');
var tsc = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var config = require('./gulpfile.config');

gulp.task('default', ['inject']);

gulp.task('inject', ['typescripts'], function () {
  var target = gulp.src('./src/client/index.html');

  var sources = gulp.src(['./src/client/app/**/*.js']).pipe(angularFilesort());

  return target.pipe(inject(sources, {relative: true}))
    .pipe(gulp.dest('./src/client'));
});

gulp.task('typescripts', function() {
    var tsProject = tsc.createProject('tsconfig.json');
    return gulp.src('./src/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(tsc(tsProject))
        .pipe(sourcemaps.write('.', {sourceRoot:''}))
        .pipe(gulp.dest('./src'));

});