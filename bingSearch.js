// Bing Image Search 

var Search = require('bing.search');
var util = require('util');


function image_query(query, page, request, response){

var search = new Search('G3JfBkfPtCI0PIGavqJ83q9X5+3nMtamNoycWml7ntY');
var resultsArr = [];

console.log(page)

console.log("This is the query: ", query);

search.images(query,
 
  {skip:page},
  function (err, results) {
    var results_ = [];  
    if(err){throw err }
    for (var i=0; i<results.length; i++){
      
    results_[i]={  
     Title: util.inspect(results[i].title),
     image_URL:  util.inspect(results[i].url),
     source_page_URL:  util.inspect(results[i].sourceUrl)
    };
    resultsArr.push(results_[i]);
   //console.log("This is the url: ", util.inspect(results[i].url));
    //console.log(util.inspect(results,  {colors: true, depth: null}));
    }
    return response.send(resultsArr);
//console.log("This is the inner function results:", results_);

});

//console.log("This is outer function access:",resultsArr);  
}

//image_query('euro2016');


module.exports.image_query = image_query;  
  