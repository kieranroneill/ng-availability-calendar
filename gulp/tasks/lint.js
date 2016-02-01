'use strict';

var eslint = require('gulp-eslint');

var config = require('../config');

module.exports = function(gulp) {
    /**
     * Lint the the scripts.
     */
    gulp.task('lint', function() {
        return gulp.src(config.Paths.main)
        .pipe(eslint({rulePaths: ['./']}))
        .pipe(eslint.formatEach());
    });
};