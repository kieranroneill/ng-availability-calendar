'use strict';

var concat = require('gulp-concat');
var iife = require('gulp-iife');
var streamqueue = require('streamqueue');
var uglify = require('gulp-uglify');

var config = require('../config');

module.exports = function(gulp) {
    /**
     * Copies the scripts and minfies the production.
     */
    gulp.task('scripts', function () {
        var minifiedStream = gulp.src(config.Paths.main)
            .pipe(concat(config.FileName.minified))
            .pipe(iife({
                params: ['Raphael'],
                args: ['Raphael']
            }))
            .pipe(uglify({ 'mangle': false, preserveComments: false }));
        var devStream = gulp.src(config.Paths.main)
            .pipe(concat(config.FileName.unminified))
            .pipe(iife({
                params: ['Raphael'],
                args: ['Raphael']
            }));

        return streamqueue({ objectMode: true }, minifiedStream, devStream)
            .pipe(gulp.dest(config.Paths.dist));
    });
};