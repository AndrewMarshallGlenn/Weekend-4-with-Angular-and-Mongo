var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider){

  $routeProvider

    .when('/tasks', {
      templateUrl: '/views/templates/tasks.html',
      controller: 'TaskController'
    })
    .otherwise({
      redirectTo: 'tasks'
    });

}]);