'use strict';

module.exports = {
    FileName: {
        unminified: 'ng-availability-calendar.js',
        minified: 'ng-availability-calendar.min.js'
    },

    Paths: {
        main: [
            './src/main.js',
            './src/**/*.js'
        ],
        watch: './src/**/*.js',
        dist: './dist',
        karmaConf: __dirname + '/../karma.conf.js'
    }
};