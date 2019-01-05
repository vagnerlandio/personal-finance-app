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
function clean() {
  return del(['dist']);
}

// Task 'images' - Run with command 'gulp images'
function images() {
  return src(imagesPath('*.*'))
    .pipe(dest('dist/img'));
}

// Task 'scripts' - Run with command 'gulp scripts'

function scripts(done) {
  function pages() {
    return src(javascriptsPath('pages/*.js'))
    .pipe(dest('dist/js'));
  }

  function vendor() {
    return src([javascriptsPath('vendor/*.js'), 'node_modules/chart.js/dist/Chart.bundle.min.js'])
    .pipe(dest('dist/js/vendor'));
  }

  function sw() {
    return src(javascriptsPath('service-worker.js'))
    .pipe(dest('dist'));
  }

  function app() {
    return src(javascriptsPath('application.js'))
    .pipe(dest('dist/js'));
  }

  series(pages, vendor, sw, app)(done);
}

// Task 'resources' - Run with command 'gulp resources'
function resources() {
  return src(resourcesPath('*.*'))
    .pipe(dest('dist/res'));
}

// Task 'styles' - Run with command 'gulp styles'
function styles(done) {
  function pages() {
    return src(stylesheetsPath('pages/*.scss'))
      .pipe(sass().on('error', sass.logError))
      .pipe(dest('dist/css'));
  }

  function app() {
    return src(stylesheetsPath('application.scss'))
      .pipe(sass().on('error', sass.logError))
      .pipe(dest('dist/css'));
  }

  series(pages, app)(done);
}

// Task 'views' - Run with command 'gulp views'
function views() {
  return src(viewsPath('pages/*.pug'))
    .pipe(pug({
      pretty: true,
    }))
    .pipe(dest('dist'));
}

function build(done) {
  series(
    clean,
    parallel(
      images,
      scripts,
      resources,
      styles,
      views
    )
  )(done);
}

// SERVER TASK
// Task 'watch' - Run with command 'gulp watch'
function watcher() {
  watch(imagesPath('**/*.*'), series(images, reload));
  watch(javascriptsPath('**/*.js'), series(scripts, reload));
  watch(resourcesPath('**/*.*'), series(resources, reload));
  watch(stylesheetsPath('**/*.scss'), series(styles));
  watch(viewsPath('**/*.pug'), series(views, reload));
}

function reload(done) {
  server.reload();
  done();
}

function serve(done) {
  server.init({
    server: {
      baseDir: './dist',
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
exports.watcher = series(build, watcher);
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
exports.dev = series(
  build,
  serve,
  watcher
);
