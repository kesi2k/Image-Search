// require and use express

var express = require('express');
var app = express();


var port = process.env.PORT;
//process.env.PORT;


// Path module to allow concatenation of paths

var path = require('path');

var config = require('./config');


//Create a connection to MongoDB
var mongoose = require('mongoose');

mongoose.connect('mongodb://' + config.db.host + '/' + config.db.name);

// Import bingSearch

//var bingSearch = require('./bingSearch.js');



//Bings Api

var Search = require('bing.search');
var util = require ('util')
var search = new Search ('G3JfBkfPtCI0PIGavqJ83q9X5+3nMtamNoycWml7ntY')





//Serves files in our public directory
app.use('/public', express.static(__dirname + "/public"));


// Route to serve homepage

app.get('/', function (request, response){
    
    response.sendFile(path.join(__dirname + "/views/index.html"));
    console.log("Sent file: ",path.join(__dirname + "/views/index.html"));
});


app.get('/search/:imagesearch', function (request, response){
    
 var query = request.url.split('/').slice(2).join();
 
 
 
 //console.log(bingSearch.image_query(query))
// response.end('Hello');
  //Want to remove this section to a function 
 var resultsArr = [];
 
 
search.images(query,
{top: 2},
  function (err, results) {
    if(err){throw err }
    for (var i=0; i<results.length; i++){
      
    resultsArr[i]={  
     Title: util.inspect(results[i].title),
     image_URL:  util.inspect(results[i].url),
     source_page_URL:  util.inspect(results[i].sourceUrl)
    };
    
}

    response.send (resultsArr);

});


})
;

var server = app.listen(port, function(){console.log('Listening on port: ', port)});