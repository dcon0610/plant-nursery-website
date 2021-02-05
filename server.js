const express = require("express");
require("dotenv").config()
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 5000;
const passport = require("passport")
const morgan = require("morgan")
const cors = require("cors")


// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'path/to/your/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })
}

app.use(passport.initialize());
// Passport config
require("./config/passport").passport;


const morganFormat = process.env.NODE_ENV === "production" ? "combined" : "dev"
app.use(morgan(morganFormat))
app.use(cors())

// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://dcon:Cwoodfc2010@cluster0.0fmfp.mongodb.net/plantwebsite", 
  {
    useNewUrlParser: true
   }).then(() => {
       console.log("Successfully connected to the database");    
   }).catch(err => {
       console.log('Could not connect to the database. Exiting now...', err);
       process.exit();
   });


// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
