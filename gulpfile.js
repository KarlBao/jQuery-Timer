var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pump = require('pump');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');

var srcFile = 'timer.jquery.js';
gulp.task('compress', ['jshint'], function(){
	pump([
		gulp.src(srcFile),
		uglify(),
		rename({
			suffix: '.min'
		}),
		gulp.dest('./')
	]);
});

gulp.task('jshint', function(){
	pump([
		gulp.src(srcFile),
		jshint(),
		jshint.reporter('default')
	]);
})