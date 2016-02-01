'use strict';

var karma = require('karma').server;

var config = require('../config');

module.exports = function(gulp) {
    gulp.task('karma', function () {
        karma.start({ configFile : config.Paths.karmaConf, singleRun: true });
    });
};