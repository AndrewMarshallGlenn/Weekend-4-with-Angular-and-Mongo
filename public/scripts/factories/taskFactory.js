/**
 * Created by andrewglenn on 3/3/16.
 */
myApp.factory('TaskFactory', ['$http', function($http) {

  //PRIVATE
//create the funtions and variables you want to share here in private
//  below are some sample functions for ajax calls. they may require changes or additions
  var sharedVariable = undefined;

  var facGetTasks = function() {
    var promise = $http.get('/routes').then(function(response) {
      sharedVariable = response.data;
      console.log(sharedVariable);
    });
    return promise;
  };

  //returning getData() in the .then() callback function is just showing that you can and may
  //want to use other functions inside these. Any function built in the factory can be used this way
  var facPostTask = function(task) {
    var promise = $http.post('/routes', {task: task}).then(function(response) {
      return facGetTasks();
    });
    return promise;
  };

  //the id added to route is an example, it could be a property on the parameter object
  //providing a document id, so the entry in the database can be isolated
  var facUpdateData = function(index, val) {
    var promise = $http.put('/routes/'+ index, {status: val}).then(function(response) {
    });
    return promise;
  };

  //index below is a similar example to the previous. the id can be passed as a parameter
  var facDeleteTask = function(index) {
    var promise = $http.delete('/routes/' + index).then(function(response) {
    });
    return promise;
  };

  //PUBLIC
  //create an object with properties that are anonymous functions that return
  //the functions and variables that you want access to in the controllers
  var FactoryOutput = {
    postTask: function(task) {
      return facPostTask(task);
    },
    getTasks: function() {
      return facGetTasks();
    },
    deleteTask: function(index) {
      return facDeleteTask(index);
    },
    updateTask: function(index, val) {
      return facUpdateData(index, val);
    },
    taskList: function() {
      return sharedVariable;
    }
  };

  //this returns the output object that gives us access in the controllers
  return FactoryOutput;
}]);