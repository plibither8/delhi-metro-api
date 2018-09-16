/*jshint esversion: 6 */

const autoprefixer = require("autoprefixer");
const babel        = require("gulp-babel");
const concat       = require("gulp-concat");
const cssnano      = require("cssnano");
const gulp         = require("gulp");
const postcss      = require('gulp-postcss');
const pxtorem      = require('postcss-pxtorem');
const rucksack     = require('rucksack-css');
const sourcemaps   = require('gulp-sourcemaps');
const stylus       = require("gulp-stylus");
const webserver    = require("gulp-webserver");

gulp.task('webserver', function () {
	return gulp.src("dist")
		.pipe(webserver({
			livereload: true,
			open: true
		}));
});

gulp.task('css', function() {
	return gulp.src('stylesheets/*.styl')
	.pipe(sourcemaps.init())
	.pipe(stylus())
	.pipe(postcss([autoprefixer, rucksack, pxtorem, cssnano]))
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest('public/css'));
});

gulp.task('js', function() {
	return gulp.src('src/js/**/*.js')
	.pipe(babel({
		comments: false,
		presets: ['env'],
		minified: true
	}))
	.pipe(concat('scripts.js'))
	.pipe(gulp.dest('public/js'));
});

gulp.task('default', ['css', 'js'], function () {
	gulp.watch(['stylesheets/**/*.styl', 'src/js/**/*.js'], ['css', 'js']);
});