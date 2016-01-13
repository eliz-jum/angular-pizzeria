/**
 * Created by siulkilulki on 10.01.16.
 */
var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    watch = require('gulp-watch'),
    rimraf = require('gulp-rimraf');
    //concat = require('gulp-concat');

gulp.task('clean', function () {
    return gulp.src('./build', {read: false})
        .pipe(rimraf());
});
gulp.task('build:dev', ['clean'], function() {
    return gulp.src(['./app/**'])
        .pipe(gulp.dest('./build'));
});
gulp.task('default', ['build:dev']);
/*gulp.task('copy', function() {
    gulp.src(['./app/!**'])
        .pipe(gulp.dest('./build'));
});
gulp.task('watch', function () {
    gulp.watch('./app/!**!/!*.*', ['copy']);
});*/

