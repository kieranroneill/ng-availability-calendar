'use strict';

var gulp = require('gulp');
var Consologger = require('consologger');

var config = require('../../config');

require('./build')();
require('../karma-watch')(gulp);
require('../lint')(gulp);
require('../scripts')(gulp);

module.exports = function() {
    gulp.task('watch', ['build', 'karma-watch'], function () {
        var logger = new Consologger();
        var onWatchChange = function(event) {
            logger.grey('File').yellow(event.path).grey('changed').print();
        };

        // Watch for changes.
        gulp.watch(config.Paths.main, ['lint', 'scripts'])
            .on('change', onWatchChange);

        logger.yellow('Watching for file changes... Use Ctrl+C to exit.').print();
    });
};