var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// Create schema with query and date fields to save to database

var querySchema = new Schema ({
    
    search_term : {type: String},
    query_time: Date
    
});


var queryLi = mongoose.model("queryLi", querySchema);

/*
function search_hist(){

//var history = [];


//list all the queries saved in the db
queryLi.find( function (err, doc){
  
  
  
  if (err){throw err}
  
  // doc is a Document
  console.log(doc);
  

  console.log("This is history from inner funct of search_hist:", doc)
  return doc;
});

//console.log("This is history from outer funct of search_hist:", doc)
//return doc;
}

//search_hist();


//module.exports.search_hist = search_hist;

*/
module.exports = queryLi;





