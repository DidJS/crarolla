var gulp = require('gulp');
var angularFilesort = require('gulp-angular-filesort');
var inject = require('gulp-inject');
var tsc = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var config = require('./gulpfile.config');

gulp.task('default', ['compile-typescript-server', 'compile-typescript-server-api', 'copy-angular-html']);

gulp.task('inject', ['compile-typescript-client'], function () {
  var target = gulp.src('./src/client/index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  var sources = gulp.src(['./public/app/**/*.js']).pipe(angularFilesort());

  return target.pipe(inject(sources), {relative: false})
    .pipe(gulp.dest('./public'));
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
                        .pipe(sourcemaps.write({sourceRoot: './public/app'}))
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
                        .pipe(sourcemaps.write({sourceRoot: './api'}))
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
                        .pipe(sourcemaps.write({sourceRoot: '.'}))
                        .pipe(gulp.dest(config.tsServerAppOutputPath));
});

gulp.task('copy-angular-html', ['inject'], function() {
    gulp.src('./src/client/app/**/*.html')
    // Perform minification tasks, etc here
    .pipe(gulp.dest('./public/app'));
});