const db = require("../models");

// Defining methods for the postsController

exports.findOne = (req,res) => {
    db.find({name: "salvia"})
    .then(results => {
        res.send(results);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving todos."
        });
    });
};

exports.findAll = (req,res) => {
    db.find()
    .then(results => {
        res.send(results);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving todos."
        });
    });
};




//module.exports = plantFinder