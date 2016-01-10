/**
 * Created by siulkilulki on 10.01.16.
 */
var gulp = require('gulp'),
jshint = require('gulp-jshint');
    //concat = require('gulp-concat');
gulp.task('copy', function() {
    gulp.src(['./app/js/*','./app/angularControllers/*'])
    //.pipe(concat('all.js'))
        .pipe(gulp.dest('./app/build'));
});