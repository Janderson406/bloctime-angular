(function() {
  function timerButton($interval) {
    return {
      templateUrl: '/templates/directives/timer_button.html',
      //controller:
      //  replace: true,
      restrict: 'E',
      scope: {},
      link: function(scope, element, attributes) { //will set up filter to convert seconds
        var WORK_TIME = 1500;       //1500 seconds
        var BREAK_TIME = 300;       //300
        var LONG_BREAK_TIME = 1800; //1800

        // INITIAL SETUP
        scope.buttonStatus = 'START';
        scope.currentTime = WORK_TIME;
        scope.onBreak = false;
        var countdown = undefined;
        scope.numWorkSessions = 0;

        scope.running = false;

        //WATCH FOR TIME TO RUN OUT AND PLAY SOUND
        var ding = new buzz.sound("assets/sounds/ding.mp3", {
          preload: true
        });

        scope.$watch('currentTime', function() {
          if (scope.currentTime === 0) {
            ding.play();
          };
        });

        var startTimer = function() {
          scope.buttonStatus = 'RESET';
          scope.running = true;
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
            }
          }, 1000); // run once a second
        };

        var stopTimer = function() {
          scope.running = false;
          if (scope.onBreak == false) { //WORK RESET
            scope.currentTime = WORK_TIME;
            $interval.cancel(countdown);
            countdown = undefined;
            scope.buttonStatus = 'START';
          } else if (scope.onBreak == true) { //BREAK RESET
            if (scope.numWorkSessions % 4 === 0) {
              scope.currentTime = LONG_BREAK_TIME;
            } else {
              scope.currentTime = BREAK_TIME;
            };

            $interval.cancel(countdown);
            countdown = undefined;
            scope.buttonStatus = 'BREAK';
          }
        };

        scope.start = function() {
          if (countdown) {
            stopTimer();
          } else {
            startTimer();
          }
        };

        scope.pause = function() {
          if (scope.running == true) {
            $interval.cancel(countdown);
            scope.running = false
          } else if (scope.running == false){
            startTimer();
          }
        }
      }

    };
  };
  angular
    .module('bloctime')
    .directive('timerButton', ['$interval', timerButton]);
})();
