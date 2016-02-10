'use strict';

angular.module('ngAvailabilityCalendarDemo', ['ng-availability-calendar'])
    .controller('DemoController', [
        '$scope',
        function($scope) {
            $scope.options = {};
            $scope.weekData = [
                [-1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, -1, -1, -1, -1, -1], // Mon.
                [-1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1], // Tues.
                [-1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, -1, -1, -1, -1, -1], // Wed.
                [-1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1], // Thu.
                [-1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, -1, -1, -1, -1, -1], // Fri.
                [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], // Sat.
                [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1] // Sun.
            ];
            $scope.slot = {
                status: '-',
                day: '-',
                time: '-'
            };

            $scope.onSlotClick = function(slot) {
                $scope.slot.status = slot.status;
                $scope.slot.day = slot.day;
                $scope.slot.time = slot.time;
            };
        }
    ])
    .filter('getStatusFilter', [
        function() {
            return function(input) {
                switch(input) {
                    case -1:
                        return 'Not Available';
                    case 0:
                        return 'Available';
                    case 1:
                        return 'Provisional booking';
                    case 2:
                        return 'Booked';
                    default:
                        return '-';
                }
            };
        }
    ])
    .filter('getDayFilter', [
        function() {
            return function(input) {
                var days = ['Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

                if(typeof input === 'number' && (input + 1) <= days.length) {
                    return days[input];
                }

                return '-';
            };
        }
    ])
    .filter('getTimeFilter', [
        function() {
            return function(input) {
                var times = ['12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm'];

                if(typeof input === 'number' && (input + 1) <= times.length) {
                    return times[input];
                }

                return '-';
            };
        }
    ]);