'use strict';

var Config = require('../config');

var rename = require('gulp-rename');
var merge = require('merge-stream');
var uglify = require('gulp-uglify');

module.exports = function(gulp) {
    /**
     * Copies the scripts and minfies the production.
     */
    gulp.task('scripts', function () {
        var minifiedStream = gulp.src(Config.Paths.main)
            .pipe(uglify({ 'mangle': false, preserveComments: false }))
            .pipe(rename({ suffix: '.min' }))
            .pipe(gulp.dest(Config.Paths.dist));
        var devStream = gulp.src(Config.Paths.main)
            .pipe(gulp.dest(Config.Paths.dist));

        return merge(minifiedStream, devStream);
    });
};