ngAvailabilityCalendar.directive('ngAvailabilityCalendar', [
    'BookingStatus',
    'WeekFactory',
    function(BookingStatus, WeekFactory) {
        return {
            restrict: 'AE',
            scope: {
                options: '='
            },
            template: '<div id="calendar"></div>',
            controller: function($scope) {
                var ctrl = this;

                ctrl.options = {
                    width: $scope.options.width || 800,
                    height: $scope.options.height || 300,
                    horizontalGutter: $scope.options.horizontalGutter || 30,
                    verticalGutter: $scope.options.verticalGutter || 20
                };
                ctrl.axisXLabelWidth = (ctrl.options.width - ctrl.options.horizontalGutter) / WeekFactory.timeLabels.length;
                ctrl.axisYLabelHeight = (ctrl.options.height - ctrl.options.verticalGutter) / WeekFactory.dayLabels.length;
                ctrl.textStyling = {
                    'font': '12px Fontin-Sans, Arial',
                    'stroke': 'none',
                    'fill': '#ffffff'
                };

                ctrl.getAvailabilityAttrs = function(status) {
                    var attrs = {
                        stroke: 'none',
                        fill: '#CCCCCC'
                    };

                    switch(status) {
                        case BookingStatus.PROVISIONAL_BOOKING:
                            attrs.fill = '#f1c40f';

                            break;
                        case BookingStatus.AVAILABLE:
                            attrs.fill = '#2dcc70';

                            break;
                        case BookingStatus.BOOKED:
                            attrs.fill = '#e84c3d';

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
                    var i, j = 0;

                    for (i = 0; i < WeekFactory.timeLabels.length; i++)
                    {
                        calendar.text(ctrl.options.horizontalGutter + ctrl.axisXLabelWidth * (i + .5), 294, WeekFactory.timeLabels[i]).attr(ctrl.textStyling);
                    }

                    for (i = 0; i < WeekFactory.dayLabels.length; i++)
                    {
                        calendar.text(10, ctrl.axisYLabelHeight * (i + .5), WeekFactory.dayLabels[i]).attr(ctrl.textStyling);
                    }

                    for (i = 0; i < WeekFactory.week.length; i++)
                    {
                        var day = WeekFactory.week[i];

                        for (j = 0; j < day.length; j++)
                        {
                            var status = day[j];
                            var xPosition = ctrl.options.horizontalGutter + ctrl.axisXLabelWidth * (j + .5);
                            var yPosition = ctrl.axisYLabelHeight * (i + .5);
                            var size = Math.round(ctrl.axisXLabelWidth / 2) - ((status === BookingStatus.NOT_AVAILABLE) ? 6.5 : 2.5);
                            var dot = calendar.circle(xPosition, yPosition, size);

                            dot.attr(ctrl.getAvailabilityAttrs(status));
                            dot.data('status', status);
                            dot.click(function()
                            {
                                if(this.data('status') === BookingStatus.AVAILABLE)
                                {
                                    this.attr(ctrl.getAvailabilityAttrs(BookingStatus.PROVISIONAL_BOOKING));
                                    this.data('status', BookingStatus.PROVISIONAL_BOOKING);
                                }
                                else if(this.data('status') === BookingStatus.PROVISIONAL_BOOKING)
                                {
                                    this.attr(ctrl.getAvailabilityAttrs(BookingStatus.AVAILABLE));
                                    this.data('status', BookingStatus.AVAILABLE);
                                }
                            });

                            dot[0].onmouseover = function ()
                            {

                            };
                        }
                    }
                };

                init();
            }
        };
    }
]);