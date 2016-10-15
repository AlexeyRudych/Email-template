var gulp = require('gulp');
var sass = require('gulp-sass');
var inky = require('inky');
var inlineCss = require('gulp-inline-css');
var inlinesource = require('gulp-inline-source');
var server = require('gulp-server-livereload');
var prefix = require('gulp-autoprefixer');


//SERVER    
gulp.task('serv', function() {
  gulp.src('./build')
    .pipe(server({
      livereload: true,
      defaultFile: 'index.html',
      open: true
    }));
});

//STYLES
gulp.task('styles', function () {
  return gulp.src('./app/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(prefix({
        browsers: ['last 15 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('./app/css'));
});
//CONVERTE INKY
gulp.task('inky', ['styles'], function() {
  return gulp.src('./app/**/*.html')
    .pipe(inlinesource())
    .pipe(inky())
    .pipe(inlineCss({
        preserveMediaQueries: true
    }))
    .pipe(gulp.dest('./build'));
});

//WATCH
gulp.task('watch',function() {
    gulp.watch(['./app/scss/*.scss', './app/**/*.html'],['inky']);
});
// gulp.task('watch', function () {
//     gulp.watch('./app/**/*.html', ['inky']);
//     gulp.watch('./app/scss/*.scss', ['inky']);
// });

gulp.task('start', ['serv', 'watch']);