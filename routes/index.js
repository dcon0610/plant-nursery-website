const path = require("path");
var express= require("express")
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const mongoose = require("mongoose");
var connection = require("../models")

router.get('/api/plants',function (request,response) {
 connection.then(client=> client.db('plantwebsite').collection('plants').find({}).toArray(function(err, docs) {
    if(err) { console.error(err) }
    response.send(JSON.stringify(docs))
})) 
  })

  module.exports = router;