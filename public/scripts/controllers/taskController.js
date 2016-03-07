/**
 * Created by andrewglenn on 3/3/16.
 */
myApp.controller('TaskController', ['$scope', 'TaskFactory', function($scope, TaskFactory) {
console.log('Im in task controller');

  var taskFactory = TaskFactory;

  $scope.task = '';
  $scope.tasks = {};

  taskFactory.getTasks().then(function(){
    $scope.tasks = taskFactory.taskList();
  });

  $scope.enterTask = function(){
    taskFactory.postTask($scope.task).then(function(){
      taskFactory.getTasks().then(function(){
        $scope.tasks = taskFactory.taskList();
      });
    });
  };

  $scope.removeTask = function(id){
    taskFactory.deleteTask(id).then(function(){
      taskFactory.getTasks().then(function(){
        $scope.tasks = taskFactory.taskList();
      });
    });
  };

  $scope.completeTask = function(id){
    taskFactory.updateTask(id, true).then(function(){
      taskFactory.getTasks().then(function(){
        $scope.tasks = taskFactory.taskList();
      });
    });
  };

  $scope.resetTask = function(id){
    taskFactory.updateTask(id, false).then(function(){
      taskFactory.getTasks().then(function() {
        $scope.tasks = taskFactory.taskList()
      });
    });
  };
}]);