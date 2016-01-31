'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

var clean = require('../clean')(gulp);
var scripts = require('../scripts')(gulp);

module.exports = function() {
    gulp.task('dist', function(done) {
        runSequence(
            ['clean'],
            ['scripts'],
            done
        );
    });
};