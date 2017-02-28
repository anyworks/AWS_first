const gulp = require('gulp');
const zip = require('gulp-zip');
const install = require('gulp-install');
const del = require('del');
var mkdirp = require('mkdirp');

gulp.task('clean', del.bind(null, ['./dist/production',"./dist/upload"]));

gulp.task('modules',["clean","awsmodules"], function() {
  mkdirp('./dist/production', function (err) {
    if (err) console.error(err);
  });

  return gulp.src("./package.json")
    .pipe(gulp.dest('dist/production'))
    .pipe(install({production: true}));
});

gulp.task('awsmodules', function() {
  return gulp.src([
    './*.js',
    'awsmodules/**'
    ],{base : '.'})
  .pipe(gulp.dest('./dist/production'));
});

gulp.task('zip',function() {
  mkdirp('./dist/upload', function (err) {
    if (err) console.error(err);
  });

  return gulp.src([
    './dist/production/**',
  ],{base : './dist/production'})
      .pipe(zip('module.zip'))
      .pipe(gulp.dest('./dist/upload'));
});

gulp.task('rebuild',["clean","modules","awsmodules"], function() {
});

gulp.task('default',["zip"], function() {
});

var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
var log_stdout = process.stdout;

console.log = function(d) {
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};
