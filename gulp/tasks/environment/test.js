'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

var karma = require('../karma')(gulp);

require('./build')();

module.exports = function() {
    gulp.task('test', function(done) {
        runSequence(
            ['build'],
            ['karma'],
            done
        );
    });
};