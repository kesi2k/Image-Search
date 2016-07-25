// require and use express

var express = require('express');
var app = express();


var port = process.env.PORT;


// Path module to allow concatenation of paths

var path = require('path');

var config = require('./config');


//Create a connection to MongoDB
var mongoose = require('mongoose');

mongoose.connect('mongodb://' + config.db.host + '/' + config.db.name);



//Serves files in our public directory
app.use('/public', express.static(__dirname + "/public"));


// Route to serve homepage

app.get('/', function (request, response){
    
    response.sendFile(path.join(__dirname + "/views/index.html"));
  //  console.log("Sent file: ",path.join(__dirname + "/views/index.html"));
});


// Test section

var Search = require('bing.search');
var util = require('util');

//TODO : Place an app.get in this apitest that responds with a json object from the search query

app.get('/search/:query', function (request, response){

var search = new Search('G3JfBkfPtCI0PIGavqJ83q9X5+3nMtamNoycWml7ntY');
var query = request.url.split('/').slice(2).join();
var resultsArr = {};



console.log("This is the query: ", query);
search.images(query,
 
 // {top: 3},
  function(err, results) {
    if(err){throw err }
    
    for (var i=0; i<results.length; i++){
      
    resultsArr[i]={  
     Title: util.inspect(results[i].title),
     image_URL:  util.inspect(results[i].url),
     source_page_URL:  util.inspect(results[i].sourceUrl)
    };
   // console.log("This is the url: ", util.inspect(results[0].url));
    //console.log(util.inspect(results,  {colors: true, depth: null}));
    }
    response.send (
  resultsArr
);
    


})
});




var server = app.listen(port, function(){console.log('Listening on port: ', port)});