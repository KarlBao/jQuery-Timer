var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pump = require('pump');
var rename = require('gulp-rename');

var srcFile = 'timer.jquery.js';
gulp.task('compress', function(cb){
	pump([
		gulp.src(srcFile),
		uglify(),
		rename({
			suffix: '.min'
		}),
		gulp.dest('./')
	],cb);
});