/**
 * Created by siulkilulki on 10.01.16.
 */
var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    watch = require('gulp-watch');
    //concat = require('gulp-concat');
gulp.task('copy', function() {
    gulp.src(['./app/js/*','./app/angularControllers/*'])
    //.pipe(concat('all.js'))
        .pipe(gulp.dest('./app/build'));
});
gulp.task('watch', function () {
    gulp.watch('**/*.js', ['copy']);
});

gulp.task('default', ['copy', 'watch']);