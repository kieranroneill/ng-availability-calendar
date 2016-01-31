'use strict';

var Config = require('../config');
var eslint = require('gulp-eslint');

module.exports = function(gulp) {
    /**
     * Lint the the scripts.
     */
    gulp.task('lint', function() {
        return gulp.src(Config.Paths.main)
        .pipe(eslint({rulePaths: ['./']}))
        .pipe(eslint.formatEach());
    });
};