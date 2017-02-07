var gulp = require('gulp'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    postcss = require('gulp-postcss'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    autoprefixer = require('gulp-autoprefixer');


var SOURCEPATHS = {
    htmlSource: 'src/*.html',
    sassSource: 'src/scss/*.scss'
}

var APPPATH = {
    root: 'app/',
    css: 'app/css',
    js: 'app/js'
}

gulp.task('sass', function() {
    return gulp.src(SOURCEPATHS.sassSource)
        .pipe(autoprefixer())
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(gulp.dest(APPPATH.css));
});

gulp.task('serve', ['sass'], function() {
   browserSync.init([APPPATH.css + '/*css', APPPATH.root + '*.html', APPPATH.js + '*.js'], {
       server: {
           baseDir: APPPATH.root
       }
   }) 
});


gulp.task('copy', function() {
    gulp.src(SOURCEPATHS.htmlSource)
        .pipe(gulp.dest(APPPATH.root))
});

gulp.task('watch', ['serve', 'sass', 'copy'], function() {
    gulp.watch([SOURCEPATHS.sassSource], ['sass']);
     gulp.watch([SOURCEPATHS.htmlSource], ['copy']);
})

gulp.task('default', ['watch']);

