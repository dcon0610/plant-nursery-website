const MongoClient = require('mongodb').MongoClient;


connection = MongoClient.connect(process.env.MONGODB_URI ||"mongodb://localhost/plantwebsite")


module.exports = connection
