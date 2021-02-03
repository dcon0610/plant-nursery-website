const { baseModelName } = require("../models/plants");
const dbPlants = require("../models/plants")
const dbUsers = require("../models/users");

// Defining methods for the postsController

exports.findOneUser = (req,res) => {
    console.log("test")
    console.log(req.body.user)
    dbUsers.findById(req.body.user)
    .then(results => {
        console.log("backend API",results)
        res.send(results);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving todos."
        });
    });
};

exports.findAll = (req,res) => {
    dbPlants.find()
    .then(results => {
        res.send(results);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving todos."
        });
    });
};

exports.addToCart = (req,res) => {
    console.log(req.body.user)
    dbUsers.findByIdAndUpdate(req.body.user,  { $push: {cart: {id: req.body.id, name: req.body.name, number: req.body.number, cost: req.body.cost}}})
    .then(results => {
        res.send(results);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving todos."
        });
    }), {new: true}
};


exports.reviseCart = (req,res) => {
   
    console.log(req.body)
    dbUsers.findByIdAndUpdate(req.body.user,  { $pull: {cart: {id:Number(req.body.id)}}},{new: true})
    //dbUsers.save()
   //dbUsers.findById(req.body.user)
    .then(results => {
        res.send(results);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving todos."
        });
    });
};
exports.addPlant = (req,res) => {
   
    console.log("incoming data",req.body)
    const newUser = new dbPlants({
        "name": req.body.plantName,
        "cost": req.body.cost,
        "height": 24

      })
      newUser
      .save()
            .then(newUser => {return res.json(newUser)})
            .catch(err => console.log(err));
    //dbUsers.save()
   //dbUsers.findById(req.body.user)

    }






//module.exports = plantFinder