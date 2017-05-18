(function() {
  function timerButton($interval) {
    return {
      templateUrl: '/templates/directives/timer_button.html',
      //controller:
      //  replace: true,
      restrict: 'E',
      scope: {},
      link: function(scope, element, attributes) {
        scope.startTime = '25:00';
        scope.currentTime = null;
        scope.running = false;

        var startTimer = function() {

        };

        var stopTimer = function() {

        };

        scope.start = function() {

        }


      }
    };
  };
  angular
    .module('bloctime')
    .directive('timerButton', ['$interval', timerButton]);
})();


/// Depedencies?
///
