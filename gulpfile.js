const gulp = require('gulp');
const del = require('del');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const page = require('gulp-gh-pages');

const pkg = require('./package.json');
const version = pkg.version;

const buildDir = './css';

gulp.task('clean', () => del([buildDir]));

gulp.task('postcss', () => {
  return gulp.src(['!src/css/_*.css', 'src/css/*.css'])
    .pipe(sourcemaps.init())
    .pipe(postcss([
      require('postcss-import'),
      require('postcss-custom-media'),
      require('postcss-media-minmax'),
      require('precss'),
      require('postcss-calc'),
      require('postcss-advanced-variables'),
      require('postcss-svg')({
        paths: ['./src/svg/'],
      }),
      require('postcss-color-hex-alpha'),
      require('autoprefixer'),
      require('css-mqpacker'),
      require('cssnano'),
    ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(`${buildDir}`));
});

gulp.task('rename', ['postcss'], () => {
  return gulp.src([`${buildDir}/paco-ui.css`])
  .pipe(sourcemaps.init())
  .pipe(rename({
    suffix: '.min',
  }))
  .pipe(sourcemaps.write('.'))
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
