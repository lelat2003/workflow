var gulp = require('gulp'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    postcss = require('gulp-postcss'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    clean = require('gulp-clean'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat');


var SOURCEPATHS = {
    htmlSource: 'src/*.html',
    sassSource: 'src/scss/*.scss',
    jsSource: 'src/js/**'
}

var APPPATH = {
    root: 'app/',
    css: 'app/css',
    js: 'app/js'
}

gulp.task('clean-html', function() {
    return gulp.src(APPPATH.root + '/*.html', {read: false, force: true})
        .pipe(clean());
});

gulp.task('clean-scripts', function() {
    return gulp.src(APPPATH.js + '/*.js', {read: false, force: true})
        .pipe(clean());
});

gulp.task('scripts', ['clean-scripts'], function() {
    gulp.src(SOURCEPATHS.jsSource)
        .pipe(concat('main.js'))
        .pipe(gulp.dest(APPPATH.js))
})


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


gulp.task('copy', ['clean-html'], function() {
    gulp.src(SOURCEPATHS.htmlSource)
        .pipe(gulp.dest(APPPATH.root))
});

gulp.task('watch', ['serve', 'sass', 'copy', 'clean-html', 'clean-scripts', 'scripts'], function() {
    gulp.watch([SOURCEPATHS.sassSource], ['sass']);
     gulp.watch([SOURCEPATHS.htmlSource], ['copy']);
    gulp.watch([SOURCEPATHS.jsSource], ['scripts']);
})

gulp.task('default', ['watch']);

