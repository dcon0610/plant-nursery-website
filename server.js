

const express = require("express");
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
}
else {
 
}
// Add routes, both API and view
var routes = require("./routes");
app.use(routes)


// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
