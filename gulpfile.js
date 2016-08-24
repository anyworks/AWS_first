const gulp = require('gulp');
const zip = require('gulp-zip');

gulp.task('default', () => {
    return gulp.src([
      'index.js'
    ],{base : '.'})
        .pipe(zip('AWS_fisrt.zip'))
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
