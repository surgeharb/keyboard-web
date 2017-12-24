/* Needed gulp config */
const gulp = require('gulp');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const minifycss = require('gulp-clean-css');
const concat = require('gulp-concat');
const plumber = require('gulp-plumber');
const strip_comments = require('gulp-strip-json-comments');

gulp.task('js-scripts', () => {
  return gulp.src(['./scripts/keyboard.js'])
    .pipe(concat({ path: 'keyboard.min.js' }))
    .pipe(gulp.dest('scripts'))
    .pipe(uglify())
    .pipe(gulp.dest('scripts'));
});

gulp.task('sass', () => {
  return gulp.src(['./styles/keyboard.scss'])
    .pipe(plumber())
    .pipe(sass())
    .pipe(strip_comments())
    .pipe(autoprefixer({ browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3'] }))
    .pipe(concat({ path: 'keyboard.css' }))
    .pipe(gulp.dest('styles'))
    .pipe(minifycss())
    .pipe(gulp.dest('styles'))
});

gulp.task('default', ['js-scripts', 'sass']);