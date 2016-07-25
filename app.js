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

//mongoose.connect('mongodb://' + config.db.host + '/' + config.db.name);


mongoose.connect('mongodb://' + config.db.host + '/' + config.db.name || 'mongodb://heroku_3jc55dnn:pn7quodffe0klos3seo22oj8l9@ds029725.mlab.com:29725/heroku_3jc55dnn');


//Import function to list query history db

var save_query = require('./save_query.js');


//Import query model

var queryLi = require('./save_query');


// Import bingSearch

var bingSearch = require('./bingSearch.js');

//Bings Api

// var Search = require('bing.search');
// var util = require ('util')
// var search = new Search ('G3JfBkfPtCI0PIGavqJ83q9X5+3nMtamNoycWml7ntY')





//Serves files in our public directory
app.use('/public', express.static(__dirname + "/public"));


// Route to serve homepage

app.get('/', function (request, response){
    
    response.sendFile(path.join(__dirname + "/views/index.html"));
    console.log("Sent file: ",path.join(__dirname + "/views/index.html"));
});

// deal with favicon request

app.get('/favicon.ico', function (request, response){
     response.writeHead(200, {'Content-Type': 'image/x-icon'} );
     response.end();
    console.log('favicon requested');
    return;
    
});





app.get('/search/:imagesearch/:page?', function (request, response){
    
 var query = request.url.split('/').slice(2,3).join();

 // Set pagination request
 
 var page = request.url.split('/').slice(3).join();
 
 if (page === undefined){
  
  page = 0;
  
 }
 
 
 //Create a new entry 
 
 var newqueryLi = queryLi ({
     search_term: query,
     query_time: new Date()          
 }); 
 
 //Save the new entry
 
 newqueryLi.save (function(err){
     
     if (err){throw err}
     
     
 });
 
 //console.log(newqueryLi);
 
 console.log(page);
 
 bingSearch.image_query(query, page, request, response);

});






// Respond with a list of the recent searches
 
 app.get('/recent', function(request, response){
     
    // respond with search history in db 
     
     queryLi.find({}).select("search_term query_time -_id").exec( function (err, doc){
  
  
  
  if (err){throw err}
  
  // doc is a Document
  console.log(doc);
  
  response.send(doc);

});
     
     
     
 });





var server = app.listen(port, function(){console.log('Listening on port: ', port)});




