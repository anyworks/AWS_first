const gulp = require('gulp');
const zip = require('gulp-zip');
const install = require('gulp-install');
const del = require('del');
var mkdirp = require('mkdirp');

gulp.task('clean', del.bind(null, ['./dist']));

gulp.task('production', function() {
  return gulp.src("./package.json")
    .pipe(gulp.dest('dist/production'))
    .pipe(install({production: true}));
});
gulp.task('mine', function() {
  mkdirp('./dist/production', function (err) {
    if (err) console.error(err);
    else console.log('pow!');
  });

  return gulp.src([
    './*.js',
    'my/**'
    ],{base : '.'})
    .pipe(gulp.dest('dist/production'));
  });
gulp.task('default',["clean"], function() {
  mkdirp('./dist/production', function (err) {
    if (err) console.error(err);
    else console.log('pow!');
  });

    return gulp.src([
      'dist/production/**',
    ],{base : 'dist/production/'})
        .pipe(zip('module.zip'))
        .pipe(gulp.dest('dist'));
});

var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
var log_stdout = process.stdout;

console.log = function(d) {
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};
