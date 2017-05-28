(function() {
  function config($locationProvider, $stateProvider) {
    $locationProvider
      .html5Mode({
        enabled: true,
        requireBase: false
      });

    $stateProvider
      .state('home', {
        url: '/',
        views: {
          'home':{
            controller: 'HomeCtrl as home',
            templateUrl: '/templates/home.html'
          },
          
          'task':{
            controller: 'TaskCtrl as task',
            templateUrl: '/templates/task.html'
          }
        },
      });

  }

  angular
    .module('bloctime', ['ui.router', 'firebase'])
    .config(config);
})();
