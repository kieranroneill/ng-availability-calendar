$(function () {
    // Data.
    var axisy = ['Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    var axisx = ['12am', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12pm', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
    var data = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0], // Mon.
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0], // Tues.
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0], // Wed.
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0], // Thu.
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0], // Fri.
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Sat.
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] // Sun.
    ];
    var width = 800;
    var height = 300;
    var raphael = Raphael('calendar', width, height);
    var leftGutter = 30;
    var bottomGutter = 20;
    var axisXLabelWidth = (width - leftGutter) / axisx.length;
    var axisYLabelHeight = (height - bottomGutter) / axisy.length;
    var textStyling = {
      'font': '12px Fontin-Sans, Arial',
      'stroke': 'none',
      'fill': '#ffffff'
    };
    var getAvailabilityAttrs = function(status)
    {
      var attrs = {
        stroke: 'none',
        fill: '#CCCCCC'
      };

      switch(status)
      {
        case 1: // Provisionally booked.
          attrs.fill = '#f1c40f';

          break;
        case 1: // Available.
          attrs.fill = '#2dcc70';

          break;
        case 2: // Booked.
          attrs.fill = '#e84c3d';

          break;
        default:
          break;
      }

      return attrs;
    };

    for (var i = 0; i < axisx.length; i++)
    {
        raphael.text(leftGutter + axisXLabelWidth * (i + .5), 294, axisx[i]).attr(textStyling);
    }

    for (var i = 0; i < axisy.length; i++)
    {
        raphael.text(10, axisYLabelHeight * (i + .5), axisy[i]).attr(textStyling);
    }

    for (var i = 0; i < data.length; i++)
    {
        var day = data[i];

        for (var j = 0; j < day.length; j++)
        {
          var status = day[j];
          var xPosition = leftGutter + axisXLabelWidth * (j + .5);
          var yPosition = axisYLabelHeight * (i + .5);
          var size = Math.round(axisXLabelWidth / 2) - ((status === 0) ? 6.5 : 2.5);
          var dot = raphael.circle(xPosition, yPosition, size);

          dot.attr(getAvailabilityAttrs(status));
          dot.data('status', status);
          dot.click(function()
          {
            if(this.data('status') === 1)
            {
              this.attr(getAvailabilityAttrs(-1));
            };
          });

          dot[0].onmouseover = function ()
          {

          };
        }
    }
});
