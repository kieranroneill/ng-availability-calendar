ng-availability-calendar
========

## Why?

In need of displaying a swazzy calendar for a project that involved booking, I came across a cool JS library: [Raphael.js](https://github.com/DmitryBaranovskiy/raphael). As my app was built in Angular 1.x, I decided to build a module that builds on the dots example and displays a booking calendar.

## Installation

Bower:

```
bower install ng-availability-calendar
```
Direct download:

* [minified](https://raw.githubusercontent.com/kieranroneill/ng-availability-calendar/master/dist/ng-availability-calendar.min.js).
* [uncompressed](https://raw.githubusercontent.com/kieranroneill/ng-availability-calendar/master/dist/ng-availability-calendar.js).

## Dependencies

* [AngularJS](https://ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular.min.js).
* [Raphael.js](https://raw.githubusercontent.com/DmitryBaranovskiy/raphael/master/raphael-min.js).

## Usage

Include ```angular.js```, ```raphael-min.js``` and the ```ng-availability-calendar``` files in the respective order:

```html
<!-- AngularJS -->
<script src="path/to/angular.js"></script>
<!-- Raphael.js -->
<script src="path/to/raphael-min.js"></script>
<!-- ng-availability-calendar -->
<script src="path/to/ng-availability-calendar.js"></script>
```
Next, inject the ```ng-availability-calendar``` module into your Angular application:
```javascript
var myApp = angular.module('myApp', ['ng-availability-calendar']);
```
Finally, add the following directive to your HTML:
```html
<ng-availability-calendar week-data="weekData" options="options" on-slot-click="onSlotClick"></ng-availability-calendar>
```
That's all there is to it! :) See [demo](https://github.com/kieranroneill/ng-availability-calendar/tree/master/demo) for a working example.

## Options

The following options can be passed to the directive:

### options

Allows you to customise the look and feel:
```javascript
var options = {
  width: 800, // Width of calendar. Default: 800.
  height: 300, // Height of calendar. Default: 300.
  horizontalGutter: 30, // Horizontal gutter between slots. Default: 30.
  verticalGutter: 20, // Vertical gutter between slots. Default: 20.
  fontFamily: 'Arial, Helvetica, sans-serif', // Font famiy for labels.
  fontColor: '#e5e5e5' // Font colour for labels.
};
```
### weekData

You must pass a matrix representing a week, where each element represents a booking status (-1, 0, 1 or 2):
```javascript
var weekData = [
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, -1, -1, -1, -1, -1], // Mon.
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1], // Tues.
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, -1, -1, -1, -1, -1], // Wed.
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1], // Thu.
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1], // Fri.
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], // Sat.
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1] // Sun.
];
```
### onSlotClick

This is a callback that is invoked when a slot is clicked:
```javascript
var onSlotClick = function(slot) {
  console.log(slot.status); // The current status.
  console.log(slot.day); // The day of the slot (0-6). Read-only.
  console.log(slot.time); // The time of the slot (0-23). Read-only.
};
```
The parameter ```slot``` passsed in the callback contains the ```slot.status``` property that can be manipulated. Which will in turn change the status of the slot the specified status (-1, 0, 1 or 2).

## License

Copyright (c) 2014 Kieran O'Neill

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

- If we meet some day, and you think this stuff is worth it, you can buy me a beer in return.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
