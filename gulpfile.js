const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

/* BROWSERSYNC TASK */
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
    });
});

/* SASS TASK */
gulp.task('sass', function() {
    return gulp.src('app/resources/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});


/* Gulp watch file - watches for changes to any file */
gulp.task('watch', ['browserSync', 'sass'], function() {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});
