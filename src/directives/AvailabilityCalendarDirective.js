ngAvailabilityCalendar.directive('ngAvailabilityCalendar', [
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
            template: '<div id="calendar"></div>',
            controller: function($scope) {
                var ctrl = this;

                WeekService.week = $scope.weekData || WeekService.week;

                ctrl.options = {
                    width: $scope.options.width || 800,
                    height: $scope.options.height || 300,
                    horizontalGutter: $scope.options.horizontalGutter || 30,
                    verticalGutter: $scope.options.verticalGutter || 20,
                    fontFamily: $scope.options.fontFamily || 'Arial, Helvetica, sans-serif',
                    fontColor: $scope.options.fontColor || '#e5e5e5'
                };
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
                var calendar = Raphael('calendar', ctrl.options.width, ctrl.options.height);

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