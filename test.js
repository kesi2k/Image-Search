// Bing Image Search 

var Search = require('bing.search');
var util = require('util');


function image_query(query){

var search = new Search('G3JfBkfPtCI0PIGavqJ83q9X5+3nMtamNoycWml7ntY');
var resultsArr = [];

console.log("This is the query:", query);
resultsArr = search.images(query,
 
  {top: 2},
  function internal(err, results) {
    if(err){throw err }
    
    for (var i=0; i<results.length; i++){
      
    resultsArr[i]={  
     Title: util.inspect(results[i].title),
     image_URL:  util.inspect(results[i].url),
     source_page_URL:  util.inspect(results[i].sourceUrl)
    };
   //console.log("This is the url: ", util.inspect(results[i].url));
    //console.log(util.inspect(results,  {colors: true, depth: null}));
    }
console.log("results inner",resultsArr);
return resultsArr;

});
console.log("results outer", resultsArr);
return resultsArr;
}

image_query('euro2016');


//module.exports.image_query = image_query;  
  