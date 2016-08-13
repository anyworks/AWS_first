const gulp = require('gulp');
const zip = require('gulp-zip');

gulp.task('default', () => {
    return gulp.src([
      '**/*',
      '!dist/*'
    ],{base : '.'})
        .pipe(zip('AWS_fisrt.zip'))
        .pipe(gulp.dest('dist'));
});
