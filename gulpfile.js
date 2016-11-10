const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const pug = require("gulp-pug");
const argv = require("yargs").argv;
const rename = require("gulp-rename");
const filter = require("gulp-filter");
const es = require("event-stream");

const babelify = require("babelify"); // eslint-disable-line no-unused-vars
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const gutil = require("gulp-util"); // eslint-disable-line no-unused-vars

const uglify = require("gulp-uglify");
const watch = require("gulp-watch");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();


const dist = !(argv.dist || argv.d);

const sO = {
  notify: !false,
  snippetOptions: {
    rule: {
      match: /<\/body>/i,
      fn(snippet, match) {
        return snippet + match;
      },
    },
  },
};

let server = argv.proxy || argv.p || false;
let browserSyncClientUrl = argv.nodes || server || "./";
browserSyncClientUrl = `${browserSyncClientUrl.toString().replace(/\/node_modules/, "").replace(/\/$/, "").replace(/^http(s)?:\/\//, "")}/node_modules/`;
browserSyncClientUrl = `//${browserSyncClientUrl}`;

if (server) {
  if ( typeof server === "boolean" ) {
    server = "localhost";
    browserSyncClientUrl = "//localhost/node_modules/";
  }

  sO.proxy = {
    "target": server,
  };
} else {
  sO.server = "./";
  browserSyncClientUrl = "./node_modules/";
}

sO.snippetOptions.rule.fn = function() {
  return `<link rel='stylesheet' href='${browserSyncClientUrl}browser-sync-client-transition/browser-sync-client.min.css' /><script async src='${browserSyncClientUrl}browser-sync-client-transition/browser-sync-client.min.js'></script>`;
};

gulp.task("browserSync", () => {
  browserSync.init(sO);
});

gulp.task("sass", () => {
  return gulp.src("./sass/**/*.sass")
    .pipe(sourcemaps.init())
    .pipe(sass({ sourcemap: true, style: "compact" }))
    .pipe(autoprefixer("last 1 version", "> 1%", "ie 8", "ie 7"))
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("./css"))
    .pipe(filter(["**/*.css"]))
    .pipe(browserSync.stream());
});

gulp.task("pug", () => {
  return gulp.src(["./*.pug"])
    .pipe(
      pug({
        "pretty": !dist,
      })
    )
    .pipe(gulp.dest("./"))
    .pipe(
      browserSync.stream()
    );
});

gulp.task("pug-pages", () => {
  return gulp.src(["./pages/**/*.pug"])
    .pipe(
      pug({
        "pretty": !dist,
      })
    )
    .pipe(gulp.dest("./pages/"))
    .pipe(
      browserSync.stream()
    );
});

gulp.task("js", () => {
  const files = [
    "./js/app.js",
    "./js/script.js",
  ];

  const tasks = files.map((entry) => {
    const filename = entry.split("/").pop();
    return browserify({ entries: [entry], debug: true })
      .transform("babelify", { presets: ["es2015", "react"] })
      .bundle()
      .pipe(source(filename))
      .pipe(buffer())
      .pipe(rename({
        suffix: ".min",
      }))
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(uglify())
      .pipe(sourcemaps.write("./"))
      .pipe(gulp.dest("./dist/js"))
      .pipe(
        browserSync.stream()
      );
  });

  return es.merge.apply(null, tasks);
});


gulp.task("watch", ["browserSync", "sass"], () => {
  watch("./sass/**/*.sass", () => { gulp.start("sass"); });
  watch("./*.pug", () => { gulp.start("pug"); });
  watch("./pages/**/*.pug", () => { gulp.start("pug-pages"); });
  watch(["./js/**/*.js", "!./js/**/*.min.js"], () => { gulp.start("js"); });
  watch(["./*.html", "./*.php"], () => { browserSync.reload(); });
});

gulp.task("default", ["browserSync", "sass", "pug", "pug-pages", "js", "watch"]);
