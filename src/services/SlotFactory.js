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