'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

require('../clean')(gulp);
require('../scripts')(gulp);

module.exports = function() {
    gulp.task('build', function(done) {
        runSequence(
            ['clean'],
            ['scripts'],
            done
        );
    });
};