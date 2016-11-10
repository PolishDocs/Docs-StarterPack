"use strict"; // eslint-disable-line
const gulp = require("gulp");
const pug = require("gulp-pug");
const markdown = require("gulp-markdown");

const watch = require("gulp-watch");

const renderer = new markdown.marked.Renderer();
renderer.heading = (text, level) => {
  return `<h${level}>${text}</h${level}>`;
};

gulp.task("pug", () => {
  return gulp.src(["./*.pug"])
    .pipe(
      pug({
        "pretty": false,
      })
    )
    .pipe(gulp.dest("./"))
});


gulp.task("pug-pages", () => {
  return gulp.src(["./pages/**/*.pug"])
    .pipe(
      pug({
        "pretty": true,
      })
    )
    .pipe(gulp.dest("./pages/"))
});

gulp.task("markdown-pages", () => {
  return gulp.src(["./pages/**/*.md"])
    .pipe(markdown({ renderer }))
    .pipe(gulp.dest("./pages/"))
});

gulp.task("watch-pages", () => {
  watch("./pages/**/*.pug", () => { gulp.start("pug-pages"); });
  watch("./*.pug", () => { gulp.start("pug"); });
  watch("./pages/**/*.md", () => { gulp.start("markdown-pages"); });
});

gulp.task("default", ["pages"]);

gulp.task("pages", ["pug", "pug-pages", "markdown-pages", "watch-pages"]);
