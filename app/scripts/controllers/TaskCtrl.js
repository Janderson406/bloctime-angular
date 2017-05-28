 (function() {
   function TaskCtrl(Tasks, $scope) { // injections ?
     $scope.allTasks = Tasks.all;
     $scope.createdAt = function(task){

     }

     $scope.addTask = function() {
       if ($scope.newTask !== ""){
         $scope.allTasks.$add($scope.newTask);
         $scope.newTask = "";
       };
     };

    $scope.clearTask = function(task) {
      $scope.allTasks.$remove(task);
    };


   }

   angular
     .module('bloctime')
     .controller('TaskCtrl', ['Tasks', '$scope', TaskCtrl]); //firebase dependencies?
 })();
