'use strict';

angular.module('ngAvailabilityCalendarDemo', ['ng-availability-calendar'])
    .controller('DemoController', [
        '$scope',
        function($scope) {
            $scope.options = {};
        }
    ]);