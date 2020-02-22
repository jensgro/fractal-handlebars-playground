// General
const { src, dest, watch, series, parallel } = require("gulp");
const gulp = require("gulp");
const del = require("del");
const rename = require("gulp-rename");

// Styles
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const prefix = require("autoprefixer");
const minify = require("cssnano");

sass.compiler = require("node-sass");

// BrowserSync
const browserSync = require("browser-sync");

const fractal = require("./fractalfile.js");
const logger = fractal.cli.console;

/**
 * Paths to project folders
 */

let paths = {
  input: "src/",
  output: "dist/",
  componentsDir: "src/components/",
  styles: {
    inbs: "src/scss/bootstrap.scss",
    input: "src/scss/**/*.{scss,sass}",
    in: "src/**/*.scss",
    output: "dist/css/"
  }
};

function processSass(sassArray, outputstyle, outputpath) {
  return src(sassArray)
    .pipe(
      sass({
        outputStyle: outputstyle
      })
    )
    .pipe(
      postcss([
        prefix({
          cascade: true,
          remove: true
        })
      ])
    )
    .pipe(dest(outputpath))
    .pipe(rename({ suffix: ".min" }))
    .pipe(
      postcss([
        minify({
          discardComments: {
            removeAll: true
          }
        })
      ])
    )
    .pipe(dest(outputpath));
}

// ein einzelnes CSS bauen => styles.css
let buildCSS = function() {
  return processSass("src/scss/styles.scss", "expanded", paths.styles.output);
};
exports.css = series(buildCSS);

// Bootstrap bauen
let buildBootstrap = function(){
  return processSass(paths.styles.inbs, "expanded", paths.styles.output);
};
exports.bs = series(buildBootstrap);

// ===== Remove pre-existing content from output folders
let cleanDist = function(done) {
  // Clean the dist folder
  del.sync([paths.output]);
  // Signal completion
  return done();
};

// gulp clear
exports.clear = series(cleanDist);

/*
 * Start the Fractal server
 *
 * In this example we are passing the option 'sync: true' which means that it will
 * use BrowserSync to watch for changes to the filesystem and refresh the browser automatically.
 * Obviously this is completely optional!
 *
 * This task will also log any errors to the console.
 */

const fractalStart = function() {
  const server = fractal.web.server({
    sync: true
  });
  server.on("error", err => logger.error(err.message));
  return server.start().then(() => {
    logger.success(`Fractal server is now running at ${server.url}`);
  });
};

async function watchFiles() {
  watch(paths.styles.in, buildCSS);
  watch(paths.styles.inbs, buildBootstrap);
}
// =============
// gulp watch
exports.watch = series(watchFiles);

// === Copy Bootstrap from node_modules as a working-copy
// gulp copybs
let copyBootstrap = function(){
  return gulp.src('node_modules/bootstrap/scss/**/*.*')
    .pipe(gulp.dest('src/scss/bootstrap/'));
}
exports.copybs = series(copyBootstrap);

// gulp sync --- Fractal mit Browserify und CSS-watcher
exports.sync = series(fractalStart, watchFiles);

// gulp
// dist-Verzeichnis löschen und Styles neu erstellen
exports.default = series(cleanDist, buildCSS, buildBootstrap);

