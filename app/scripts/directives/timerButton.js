(function() {
  function timerButton($interval) {
    return {
      templateUrl: '/templates/directives/timer_button.html',
      //controller:
      //  replace: true,
      restrict: 'E',
      scope: {},
      link: function(scope, element, attributes) {
        // scope.startTime = '25:00';
        scope.currentTime = '0:00'; // placeholder
        scope.workStatus = true; // track if work timer
        scope.breakStatus = false; // track if break timer
        scope.buttonStatus = 'START';
        scope.running = false;

        var startTimer = function() {
          scope.running = true;
          scope.currentTime = 1500; //will set up filter to convert seconds

          scope.countdown = $interval(function() {
            scope.currentTime--;
            console.log("second");

          }, 1000);
        };

        var stopTimer = function() {
          scope.running = false;
          scope.currentTime = 1500;
        };

        scope.start = function() {
          scope.buttonStatus = 'RESET';
          if (scope.running = false) {

            startTimer();


          } else if (scope.running = true) {
            //scope.buttonStatus = 'START';
            stopTimer();
          };

        }


      }
    };
  };
  angular
    .module('bloctime')
    .directive('timerButton', ['$interval', timerButton]);
})();
