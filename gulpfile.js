var gulp = require('gulp');
var angularFilesort = require('gulp-angular-filesort');
var inject = require('gulp-inject');
var tsc = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var config = require('./gulpfile.config');

gulp.task('default', ['compile-typescript-server', 'compile-typescript-server-api', 'inject']);

gulp.task('inject', ['compile-typescript-client'], function () {
  var target = gulp.src('./src/client/index.html');

  var sources = gulp.src(['./src/client/app/**/*.js']).pipe(angularFilesort());

  return target.pipe(inject(sources, {relative: true}))
    .pipe(gulp.dest('./src/client'));
});

gulp.task('compile-typescript-client', function() {
    var tsProject = tsc.createProject('tsconfig.json');
    var sourceTsFiles = [config.allClientTypeScript,                //path to typescript files
                         config.libraryTypeScriptDefinitions]; //reference to library .d.ts files


    var tsResult = gulp.src(sourceTsFiles)
                       .pipe(sourcemaps.init())
                       .pipe(tsc(tsProject));

        tsResult.dts.pipe(gulp.dest(config.tsClientOutputPath));
        return tsResult.js
                        .pipe(sourcemaps.write({includeContent: true, sourceRoot:'./src/client/app'}))
                        .pipe(gulp.dest(config.tsClientOutputPath));
});

gulp.task('compile-typescript-server-api', function() {
    var tsProject = tsc.createProject('tsconfig.json');
    var sourceTsFiles = [config.allServerTypeScript,                //path to typescript files
                         config.libraryTypeScriptDefinitions]; //reference to library .d.ts files


    var tsResult = gulp.src(sourceTsFiles)
                       .pipe(sourcemaps.init())
                       .pipe(tsc(tsProject));

        tsResult.dts.pipe(gulp.dest(config.tsServerOutputPath));
        return tsResult.js
                        .pipe(sourcemaps.write({includeContent: true, sourceRoot:'./src/api'}))
                        .pipe(gulp.dest(config.tsServerOutputPath));
});

gulp.task('compile-typescript-server', function() {
    var tsProject = tsc.createProject('tsconfig.json');
    var sourceTsFiles = [config.sourceServer,
                         config.libraryTypeScriptDefinitions]; //reference to library .d.ts files


    var tsResult = gulp.src(sourceTsFiles)
                       .pipe(sourcemaps.init())
                       .pipe(tsc(tsProject));

        tsResult.dts.pipe(gulp.dest(config.tsServerAppOutputPath));
        return tsResult.js
                        .pipe(sourcemaps.write({includeContent: true, sourceRoot: ''}))
                        .pipe(gulp.dest(config.tsServerAppOutputPath));
});

gulp.task('copy-angular-html', ['inject'], function() {
    gulp.src('./src/client/app/**/*.html')
    // Perform minification tasks, etc here
    .pipe(gulp.dest('./src/client'));
});