;(function(Raphael) {
"use strict";

var ngAvCal = angular.module('ng-availability-calendar', []);
ngAvCal.constant('BookingStatus', {
    NOT_AVAILABLE: -1,
    AVAILABLE: 0,
    PROVISIONAL_BOOKING: 1,
    BOOKED: 2
});
ngAvCal.directive('ngAvailabilityCalendar', [
    '$timeout',
    'BookingStatus',
    'SlotFactory',
    'WeekService',
    function($timeout, BookingStatus, SlotFactory, WeekService) {
        return {
            restrict: 'AE',
            scope: {
                weekData: '=',
                options: '=',
                onSlotClick: '&'
            },
            template: '<div id="availability-calendar"></div>',
            controller: function($scope) {
                var ctrl = this;
                var defaults = {
                    width: 800,
                    height: 300,
                    horizontalGutter: 30,
                    verticalGutter: 20,
                    fontFamily: 'Arial, Helvetica, sans-serif',
                    fontColor: '#e5e5e5'
                };

                WeekService.week = $scope.weekData || WeekService.week;

                ctrl.options = {};

                angular.extend(ctrl.options, defaults, ($scope.options || {}));

                ctrl.axisXLabelWidth = (ctrl.options.width - ctrl.options.horizontalGutter) / WeekService.timeLabels.length;
                ctrl.axisYLabelHeight = (ctrl.options.height - ctrl.options.verticalGutter) / WeekService.dayLabels.length;
                ctrl.textStyling = {
                    'font-family': ctrl.options.fontFamily,
                    'font-size': '12px',
                    'stroke': 'none',
                    'fill': ctrl.options.fontColor
                };

                ctrl.getAvailabilityAttrs = function(status) {
                    var attrs = {
                        'stroke-width': '3',
                        'cursor': 'not-allowed',
                        'stroke': 'none',
                        'fill': '#CCCCCC'
                    };

                    switch(status) {
                        case BookingStatus.PROVISIONAL_BOOKING:
                            attrs['stroke'] = '#2980B9';
                            attrs['fill'] = '#16A085';
                            attrs['cursor'] = 'pointer';

                            break;
                        case BookingStatus.AVAILABLE:
                            attrs['fill'] = '#2dcc70';
                            attrs['cursor'] = 'pointer';

                            break;
                        case BookingStatus.BOOKED:
                            attrs['fill'] = '#e84c3d';

                            break;
                        default:
                            break;
                    }

                    return attrs;
                };
            },
            link: function(scope, element, attrs, ctrl) {
                var calendar = Raphael('availability-calendar', ctrl.options.width, ctrl.options.height);

                var init = function() {
                    var col, row = 0;

                    for (col = 0; col < WeekService.timeLabels.length; col++) {
                        calendar.text(ctrl.options.horizontalGutter + ctrl.axisXLabelWidth * (col + .5), 294, WeekService.timeLabels[col]).attr(ctrl.textStyling);
                    }

                    for (col = 0; col < WeekService.dayLabels.length; col++) {
                        calendar.text(10, ctrl.axisYLabelHeight * (col + .5), WeekService.dayLabels[col]).attr(ctrl.textStyling);
                    }

                    for (col = 0; col < WeekService.week.length; col++) {
                        var day = WeekService.week[col];

                        for (row = 0; row < day.length; row++) {
                            var status = day[row];
                            var xPosition = ctrl.options.horizontalGutter + ctrl.axisXLabelWidth * (row + .5);
                            var yPosition = ctrl.axisYLabelHeight * (col + .5);
                            var size = Math.round(ctrl.axisXLabelWidth / 2) - ((status === BookingStatus.NOT_AVAILABLE) ? 6.5 : 2.5);
                            var dot = calendar.circle(xPosition, yPosition, size);

                            dot.attr(ctrl.getAvailabilityAttrs(status));
                            dot.data('status', status);
                            dot.data('day', col);
                            dot.data('time', row);

                            dot.click(function() {
                                // Return slot wrapper.
                                var slot = SlotFactory.getInstance(this);

                                // Get it in the digest cycle!
                                $timeout(function() {
                                    scope.onSlotClick()(slot);
                                });
                            });
                        }
                    }
                };

                init();
            }
        };
    }
]);
ngAvCal.factory('SlotFactory', [
    'BookingStatus',
    function(BookingStatus) {
        var Slot = function(element) {
            var self = this;
            var status = element.data('status');
            var day = element.data('day');
            var time = element.data('time');

            this.element = element;
            this.setAttrs = function(status) {
                var attrs = {
                    'stroke-width': '3',
                    'cursor': 'not-allowed',
                    'stroke': 'none',
                    'fill': '#CCCCCC'
                };

                switch(status) {
                    case BookingStatus.PROVISIONAL_BOOKING:
                        attrs['stroke'] = '#2980B9';
                        attrs['fill'] = '#16A085';
                        attrs['cursor'] = 'pointer';

                        break;
                    case BookingStatus.AVAILABLE:
                        attrs['fill'] = '#2dcc70';
                        attrs['cursor'] = 'pointer';

                        break;
                    case BookingStatus.BOOKED:
                        attrs['fill'] = '#e84c3d';

                        break;
                    default:
                        break;
                }

                this.element.attr(attrs);
            };

            Object.defineProperty(this, 'status', {
                get: function() {
                    return status;
                },
                set: function (value) {
                    if(typeof value === 'number' && (value >= -1 && value <= 2)) {
                        self.element.data('status', value);
                        self.setAttrs(value);
                    }

                    status = value;
                }
            });
            Object.defineProperty(this, 'day', {
                value: day,
                writable: false
            });
            Object.defineProperty(this, 'time', {
                value: time,
                writable: false
            });
        };

        return {
            getInstance: function(element) {
                return new Slot(element);
            }
        };
    }
]);
ngAvCal.service('WeekService',[
    function() {
        this.timeLabels = ['12am', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12pm', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11pm'];
        this.dayLabels = ['Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        this.week = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Mon.
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Tues.
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Wed.
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Thu.
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Fri.
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Sat.
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] // Sun.
        ];
    }
]);
}(Raphael));
