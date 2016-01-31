'use strict';

var gulp = require('gulp');
var Config = require('../../config');
var Consologger = require('consologger');

var lint = require('../lint')(gulp);
var scripts = require('../scripts')(gulp);

require('./dist')();

module.exports = function() {
    gulp.task('watch', ['dist'], function () {
        var logger = new Consologger();
        var onWatchChange = function(event) {
            logger.grey('File').yellow(event.path).grey('changed').print();
        };

        // Watch for changes.
        gulp.watch(Config.Paths.main, ['lint', 'scripts'])
            .on('change', onWatchChange);

        logger.yellow('Watching for file changes... Use Ctrl+C to exit.').print();
    });
};