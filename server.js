

const express = require("express");
const MongoClient = require('mongodb').MongoClient
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 5000;
let resultsArray=[]



// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
;
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get('/api/plants',(request,response) => {
    MongoClient.connect("process.env.MONGODB_URI", function(err, database){
    console.log("connected with this!")
    const database1 = database.db('plantwebsite')
    const json = database1.collection('plants').find({}).toArray(function(err, str){
    
      if (err) throw err;
    
    response.json({plants: str})
        database.close();
    })
    
    
    
    
    
    })
    })
}
else {
  app.get('/api/plants',(request,response) => {
    MongoClient.connect("mongodb://localhost/plantwebsite", function(err, database){
    console.log("connected with this!")
    const database1 = database.db('plantwebsite')
    const json = database1.collection('plants').find({}).toArray(function(err, str){
    
      if (err) throw err;
    
    response.json({plants: str})
        database.close();
    })
    
    
    
    
    
    })
    })
}
// Add routes, both API and view


// Connect to the Mongo DB
//mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/plantwebsite");


// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
