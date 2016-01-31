'use strict';

var del = require('del');

module.exports = function(gulp) {
    /**
     * Remove everything from the dist directory.
     */
    gulp.task('clean', function(callback) {
        return del('dist/**', callback);
    });
};