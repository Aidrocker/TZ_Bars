const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');

function style() {
    return gulp.src('./public/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./public'))
}

function watch(){
    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    gulp.watch('./public/**/*.scss', style);
    gulp.watch('./*.html').on('change', browserSync.reload);
}


exports.style = style;
exports.watch = watch;