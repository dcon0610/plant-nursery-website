const mongoose = require('mongoose').MongoasdfClient
const plants = require('./../models/plantsModel.js')

const connectDB = async () => {
    try {
        //database Name
        const databaseName='PlantNursery';
        const con = await mongoose.connect(`mongodb://127.0.0.1:27017/${databaseName}`, { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });
        console.log(`Database connected : ${con.connection.host}`)
        console.log(databaseName)
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}

module.exports = connectDB