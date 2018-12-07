var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var pug = require('gulp-pug');
var concat = require('gulp-concat');
var merge = require('merge-stream');
/*
 * Variables
 */
// Sass source
var scssFiles = './src/styles/style.scss';
var cssDest = './dist/css';
var sassDevOptions = { outputStyle: 'expanded' }
var sassProdOptions = { outputStyle: 'compressed' }

// Task 'css' - Run with command 'gulp css'
gulp.task('css', function(){
  return gulp.src(scssFiles)
    .pipe(sass(sassProdOptions).on('error', sass.logError))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest(cssDest));
});

// Task 'css-dev' - Run with command 'gulp css-dev'
gulp.task('css-dev', function(){
  return gulp.src(scssFiles)
    .pipe(sass(sassDevOptions).on('error', sass.logError))
    .pipe(gulp.dest(cssDest));
});

// Task 'vendor' - Run with command 'gulp vendor'
gulp.task('vendor', function(){
  var js = gulp.src('./src/vendor/js/*.js')
    .pipe(gulp.dest('dist/js'));
  var css = gulp.src('./src/vendor/css/*.css')
    .pipe(gulp.dest('dist/css'));
});

// Task 'images' - Run with command 'gulp images'
gulp.task('images', function(){
  return gulp.src('./src/images/*')
    .pipe(gulp.dest('dist/img'));
});

// Task 'root-files' - Run with command 'gulp root-files'
gulp.task('root-files', function(){
  return gulp.src('./src/root-files/*.*')
    .pipe(gulp.dest('dist'));
});

// Task 'html' - Run with command 'gulp html'
gulp.task('html', function(){
  return gulp.src('src/views/**/[^_]*.pug')
    .pipe(pug())
    .pipe(gulp.dest('dist'));
});

// Task 'js' - Run with command 'gulp js'
gulp.task('js', function(){
  return gulp.src('./src/scripts/script.js')
    .pipe(concat('script.min.js'))
    .pipe(gulp.dest('./dist/js'));
});

// Task 'watch' - Run with command 'gulp watch'
gulp.task('watch', function(){
  // Add 'css-dev' for non-minified css
  gulp.watch('./src/**/*.*', ['html', 'css', 'js', 'vendor', 'images', 'root-files']);
});

// Default task - Run with command 'gulp'
// Add 'css-dev' for non-minified assets
gulp.task('default', ['html', 'css', 'js', 'vendor', 'images', 'root-files', 'watch']);

gulp.task('build', ['html', 'css', 'js', 'vendor', 'images', 'root-files']);
