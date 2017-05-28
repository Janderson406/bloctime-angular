(function() {
  function Tasks($firebaseArray) {
    var ref = firebase.database().ref(); //update

    // download tasks into a synchronized array
    var tasks = $firebaseArray(ref);

    return {
      all: tasks
      // remaining logic for tasks
    };
  }

  angular
    .module('bloctime')
    .factory('Tasks', ['$firebaseArray', Tasks]);
})();
