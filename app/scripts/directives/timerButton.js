(function() {
  function timerButton($interval) {
    return {
      templateUrl: '/templates/directives/timer_button.html',
      //controller:
      //  replace: true,
      restrict: 'E',
      scope: {},
      link: function(scope, element, attributes) {
        scope.buttonStatus = 'START';
        scope.currentTime = '0:00'; // placeholder
        var workStatus = true; // track if work timer
        var breakStatus = false; // track if break timer
        var countdown = undefined;

        var startTimer = function() {
          scope.buttonStatus = 'RESET';
          scope.currentTime = 1500; //will set up filter to convert seconds

          countdown = $interval(function() {
            scope.currentTime--;
            //console.log("second");
          }, 1000);

        };

        var stopTimer = function() {
          scope.currentTime = 1500;
          $interval.cancel(countdown);
          countdown = undefined;
          scope.buttonStatus = 'START';
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
