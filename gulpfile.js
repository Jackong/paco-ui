const gulp = require('gulp');
const del = require('del');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const page = require('gulp-gh-pages');

const pkg = require('./package.json');
const version = pkg.version;

const buildDir = './css';

gulp.task('clean', () => del([buildDir]));

gulp.task('postcss', () => {
  return gulp.src(['!src/css/_*.css', 'src/css/*.css'])
    .pipe(postcss([
      require('precss'),
      require('postcss-svg')({
        paths: ['./src/svg/'],
      }),
      require('autoprefixer'),
      require('css-mqpacker'),
      require('cssnano'),
    ]))
    .pipe(gulp.dest(`${buildDir}`));
});

gulp.task('rename', ['postcss'], () => {
  return gulp.src([`${buildDir}/paco-ui.css`])
  .pipe(rename({
    suffix: '.min',
  }))
  .pipe(gulp.dest(`${buildDir}`));
});

gulp.task('watch', ['postcss'], () => {
  return gulp.watch('src/**/*.css', ['postcss']);
});

gulp.task('build', ['postcss']);

gulp.task('deploy', () => {
  return gulp.src('src/font/**/*')
  .pipe(page());
});
