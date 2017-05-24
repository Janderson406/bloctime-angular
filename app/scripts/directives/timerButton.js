(function() {
  function timerButton($interval) {
    return {
      templateUrl: '/templates/directives/timer_button.html',
      //controller:
      //  replace: true,
      restrict: 'E',
      scope: {},
      link: function(scope, element, attributes) { //will set up filter to convert seconds
        var BREAK_TIME = 3;         //300
        var LONG_BREAK_TIME = 8; //1800
        var WORK_TIME = 5;         //1500

        // INITIAL SETUP
        scope.buttonStatus = 'START';
        scope.currentTime = WORK_TIME;
        scope.onBreak = false;
        var countdown = undefined;
        scope.numWorkSessions = 0;

        var startTimer = function() {
          scope.buttonStatus = 'RESET';

          countdown = $interval(function() {
            if (scope.currentTime >= 1) {
              scope.currentTime--;
            } else {
              // When time natually counts down:
              if (scope.onBreak == false) {
                scope.currentTime = BREAK_TIME;
                scope.buttonStatus = 'BREAK';
                scope.onBreak = true;
                scope.numWorkSessions++;
              } else if (scope.onBreak == true) {
                scope.currentTime = WORK_TIME;
                scope.buttonStatus = 'WORK';
                scope.onBreak = false;
              }
              stopTimer();
              // alert("countdown end");
            }
          }, 1000); // run once a second
        };

        var stopTimer = function() {
          if (scope.onBreak == false) { //WORK RESET
            scope.currentTime = WORK_TIME;
            $interval.cancel(countdown);
            countdown = undefined;
            scope.buttonStatus = 'START';
            // alert("first stopTimer");
          } else if (scope.onBreak == true) { //BREAK RESET
            if (scope.numWorkSessions % 4 === 0) {
              scope.currentTime = LONG_BREAK_TIME;
            } else {
              scope.currentTime = BREAK_TIME;
            };
            $interval.cancel(countdown);
            countdown = undefined;
            scope.buttonStatus = 'BREAK';
            // alert("second stopTimer");
          }
        };

        scope.start = function() {
          if (countdown) {
            stopTimer();
          } else {
            startTimer();
          }
        };
      }

    };
  };
  angular
    .module('bloctime')
    .directive('timerButton', ['$interval', timerButton]);
})();
