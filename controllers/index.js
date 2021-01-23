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
    dbUsers.findOneAndUpdate(req.body.user,  { $push: {cart: {name: req.body.name, number: req.body.number, cost: req.body.cost}}})
    .then(results => {
        res.send(results);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving todos."
        });
    });
};

exports.reviseCart = (req,res) => {
    console.log("route working",req.body.user)
    console.log(req.body.index)
    var string = `cart.${req.body.index}`
    dbUsers.findOneAndUpdate(req.body.user,  { $unset: {string: 1}})
    //dbUsers.findOneAndUpdate(req.body.user,{$pull:{"cart":null}})
    .then(results => {
        res.send(results);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving todos."
        });
    });
};





//module.exports = plantFinder