var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var routes = require('./routes/routes');


app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function(){
    console.log('listening on port: ', app.get('port'));
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));
app.use(express.static('public/views'));
app.use(express.static('public/scripts'));
app.use(express.static('public/styles'));
app.use(express.static('public/vendors'));

app.use('/routes', routes);


module.exports = app;