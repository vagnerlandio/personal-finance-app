const gulp    = require('gulp');
const sass    = require('gulp-sass');
const pug     = require('gulp-pug');
const concat  = require('gulp-concat');
const merge   = require('merge-stream');
const del     = require('del');
const browser = require('browser-sync').create();

// AUX VARIABLES & FUNCTIONS
const watchFiles = [
  imagesPath('**/*.*'),
  javascriptsPath('**/*.js'),
  resourcesPath('**/*.*'),
  stylesheetsPath('**/*.scss'),
  viewsPath('**/*.pug')
];

const watchDistFiles = [
  '**/*.html',
  'js/**/*.js',
  'css/**/*.css'
];

const tasks = [
  'images',
  'scripts',
  'resources',
  'styles',
  'views'
];

function imagesPath(param) {
  const path = 'src/assets/images/';
  return (typeof param === 'undefined') ? path : path + param;
}

function javascriptsPath(param) {
  const path = 'src/assets/javascript/';
  return (typeof param === 'undefined') ? path : path + param;
}

function resourcesPath(param) {
  const path = 'src/assets/resources/';
  return (typeof param === 'undefined') ? path : path + param;
}

function stylesheetsPath(param) {
  const path = 'src/assets/stylesheets/';
  return (typeof param === 'undefined') ? path : path + param;
}

function viewsPath(param) {
  const path = 'src/views/';
  return (typeof param === 'undefined') ? path : path + param;
}

// TASKS
// Task 'del' - Run with command 'gulp del'
gulp.task('del', () => {
  del(['dist']);
});

// Task 'images' - Run with command 'gulp images'
gulp.task('images', () => {
  gulp.src(imagesPath())
    .pipe(gulp.dest('dist/img'));
});

// Task 'scripts' - Run with command 'gulp scripts'
gulp.task('scripts', () => {
  let pages = gulp.src(javascriptsPath('pages/*.js'))
    .pipe(gulp.dest('dist/js'));

  let vendor = gulp.src(javascriptsPath('vendor/*.js'))
    .pipe(gulp.dest('dist/js/vendor'));

  let sw = gulp.src(javascriptsPath('service-worker.js'))
    .pipe(gulp.dest('dist'));

  let app = gulp.src(javascriptsPath('application.js'))
    .pipe(gulp.dest('dist/js'));

  merge(pages, vendor, sw, app);
});

// Task 'resources' - Run with command 'gulp resources'
gulp.task('resources', () => {
  gulp.src(resourcesPath())
    .pipe(gulp.dest('dist/res'));
});

// Task 'styles' - Run with command 'gulp styles'
gulp.task('styles', () => {
  let pages = gulp.src(stylesheetsPath('pages/*.scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));

  // let vendor = gulp.src(stylesheetsPath('vendor/*.scss'))
  //   .pipe(sass().on('error', sass.logError))
  //   .pipe(gulp.dest('dist/css'));

  let app = gulp.src(stylesheetsPath('application.scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));

  merge(pages,/* vendor,*/ app, browser.reload({ stream: true }));
});

// Task 'views' - Run with command 'gulp views'
gulp.task('views', () => {
  gulp.src(viewsPath('pages/*.pug'))
    .pipe(pug())
    .pipe(gulp.dest('dist'));
});

// SERVER TASK
// Task 'watch' - Run with command 'gulp watch'
gulp.task('watch', () => {
  gulp.watch(watchFiles, tasks);
});

gulp.task('server', tasks, () => {

  browser.init({
    server: {
      baseDir: 'dist'
    }
  });

  gulp.watch(watchFiles, tasks);
  gulp.watch(watchDistFiles).on('change', browser.reload);
  // gulp.watch(watchFiles).on('change', browser.reload);

});

// MAIN TASKS
gulp.task('default', tasks);
