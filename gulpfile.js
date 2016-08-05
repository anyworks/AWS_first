const gulp = require('gulp');
const zip = require('gulp-zip');

gulp.task('default', () => {
    return gulp.src([
      '*'
    ])
        .pipe(zip('archive.zip'))
        .pipe(gulp.dest('dist'));
});
