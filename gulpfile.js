const { src, dest, watch, series, parallel }    = require('gulp');
const sass        = require('gulp-sass');
const pug         = require('gulp-pug');
const merge       = require('merge-stream');
const del         = require('del');
const browserSync = require('browser-sync');
const server      = browserSync.create();

// AUX VARIABLES & FUNCTIONS
const watchFiles = [
  imagesPath('**/*.*'),
  javascriptsPath('**/*.js'),
  resourcesPath('**/*.*'),
  stylesheetsPath('**/*.scss'),
  viewsPath('**/*.pug'),
];

const watchDistFiles = [
  'dist/**/*.html',
  'dist/js/**/*.js',
  'dist/css/**/*.css',
];

function imagesPath(param) {
  const path = 'src/assets/images/';
  return (typeof param === 'undefined') ? path : path + param;
}

function javascriptsPath(param) {
  const path = 'src/assets/javascripts/';
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
function clean(done) {
  del(['dist']);
  done();
}

// Task 'images' - Run with command 'gulp images'
function images(done) {
  src(imagesPath('*.*'))
    .pipe(dest('dist/img'));
  done();
}

// Task 'scripts' - Run with command 'gulp scripts'
function scriptsPages(done) {
  src(javascriptsPath('pages/*.js'))
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream());
  done();
}

function scriptsVendor(done) {
  src(javascriptsPath('vendor/*.js'))
    .pipe(dest('dist/js/vendor'))
    .pipe(browserSync.stream());
  done();
}

function scriptsSw(done) {
  src(javascriptsPath('service-worker.js'))
    .pipe(dest('dist'));
  done();
}

function scriptsApp(done) {
  src(javascriptsPath('application.js'))
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream());
  done();
}

function scripts(done) {
  series(scriptsPages, scriptsVendor, scriptsSw, scriptsApp)(done);
}

// Task 'resources' - Run with command 'gulp resources'
function resources(done) {
  src(resourcesPath('*.*'))
    .pipe(dest('dist/res'));
  done();
}

// Task 'styles' - Run with command 'gulp styles'
function styles(done) {
  function pages(done) {
    src(stylesheetsPath('pages/*.scss'))
      .pipe(sass().on('error', sass.logError))
      .pipe(dest('dist/css'))
      .pipe(browserSync.stream());
    done();
  }

  function app(done) {
    src(stylesheetsPath('application.scss'))
      .pipe(sass().on('error', sass.logError))
      .pipe(dest('dist/css'))
      .pipe(browserSync.stream());
    done();
  }

  series(pages, app)(done);
}

// Task 'views' - Run with command 'gulp views'
function views(done) {
  src(viewsPath('pages/*.pug'))
    .pipe(pug())
    .pipe(dest('dist'));
  done();
}

// SERVER TASK
// Task 'watch' - Run with command 'gulp watch'
function watcher() {
  watch(watchFiles, series(images, scripts, resources, styles, views));
}

function reload(done) {
  server.reload();
  done();
}

function serve(done) {
  server.init({
    server: {
      baseDir: 'dist',
    },
  });
  done();
}

exports.clean = clean;
exports.images = images;
exports.scripts = scripts;
exports.resources = resources;
exports.styles = styles;
exports.views = views;
exports.watcher = watcher;
exports.reload = reload;
exports.serve = serve;

// MAIN TASKS
exports.build = series(
  clean,
  parallel(
    images,
    scripts,
    resources,
    styles,
    views
  )
);
