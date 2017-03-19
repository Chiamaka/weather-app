const gulp        = require('gulp');
const sass        = require('gulp-sass');
const browserSync = require('browser-sync').create();
const useref      = require('gulp-useref');
const uglify      = require('gulp-uglify');
const gulpIf      = require('gulp-if');
const cssnano     = require('gulp-cssnano');
const imagemin    = require('gulp-imagemin');
const cache       = require('gulp-cache');
const del         = require('del');
const runSequence = require('run-sequence');

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

/* USEREF TASK */
gulp.task('useref', function(){
    return gulp.src('app/*.html')
    .pipe(useref())
    // Minifies only if it's a JavaScript file
    .pipe(gulpIf('*.js', uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'));
});

/* IMAGES TASK */
gulp.task('images', function(){
    return gulp.src('app/resources/images/*.+(png|jpg|gif|svg)')
    .pipe(cache(imagemin({
        interlaced: true
    })))
    .pipe(gulp.dest('dist/images'));
});

/* FONTS TASK */
gulp.task('fonts', function() {
    return gulp.src('app/vendors/fonts/*')
    .pipe(gulp.dest('dist/fonts'));
});

/* Clean up task */
gulp.task('clean:dist', function() {
    return del.sync('dist');
});


/* Gulp watch file - watches for changes to any file */
gulp.task('watch', ['browserSync', 'sass'], function() {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

/* Build tasks */
gulp.task('default', function(callback) {
    runSequence(['sass', 'browserSync'], 'watch',
    callback
    );
});

gulp.task('build', function(callback) {
    runSequence('clean:dist','sass', ['useref', 'images', 'fonts'],
    callback
    );
});
