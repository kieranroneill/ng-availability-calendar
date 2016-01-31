'use strict';

var karma = require('karma').server;

var config = require('../config');

module.exports = function(gulp) {
    gulp.task('karma-watch', function () {
        karma.start({ configFile : config.Paths.karmaConf, singleRun: false });
    });
};