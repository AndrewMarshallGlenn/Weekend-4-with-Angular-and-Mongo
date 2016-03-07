/**
 * Created by andrewglenn on 3/3/16.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//change the name of the database at the end of the url below
mongoose.connect('mongodb://localhost/taskapp');
mongoose.model(

  //change the name of the schema and the field names below
  'Task',
  new Schema({
      "task": String,
      "status": Boolean
    },
    {
      //change the collection name below
      collection: 'tasks'
    }
  ));

//change the name of the variable and model below
var Task = mongoose.model('Task');


//$http Requests:

//change the schema call below to match the model variable above
router.get('/', function(req, res) {
  Task.find({}, function(err, data) {
    if(err) {
      console.log('ERR: ', err);
    }
    res.send(data);
  });
});

//the object properties below come from the object you are passing into the ajax call
router.post('/', function(req, res) {
  var addedDocument = new Task({
    "task": req.body.task,
    "status": false
  });

  addedDocument.save(function(err, data) {
    if(err) {
      console.log('ERR: ', err);
    }
    Task.find({}, function(err, data) {
      if(err) {
        console.log('ERR: ', err);
      }
      res.send(data);
    });
  });
});

//there are other methods that can be used but findByIdAndRemove seems most likely
//change the model reference
router.delete('/:id', function(req, res) {
  Task.findByIdAndRemove({"_id" : req.params.id}, function(err, data) {
    if(err) {
      console.log('ERR: ', err);
    }
    res.send(data);
  });
});

//there are other methods that can be used but findByIdAndUpdate seems most likely
//the object properties below come from the object you are passing into the ajax call
router.put('/:id', function(req, res){
  var StatusUpdate = req.body.status;
  console.log(StatusUpdate);
  Task.findByIdAndUpdate(
    {_id: req.params.id},
    {
      $set: {status: StatusUpdate
      }
    },
    function(err, data) {
      if(err) {
        console.log('ERR: ', err);
      }
      res.send(data);
    }
  );
});

module.exports = router;