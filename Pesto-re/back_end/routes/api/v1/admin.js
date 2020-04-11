const express = require("express");
const router = express.Router();

// Give access to all models
const User = require("../../../models/User");
const Pesto = require("../../../models/Pesto");

router
    .route("/User-Admin")
    // List all users
    .get(async(req,res) => {
        const result = await User.find({});
        return res.status(200).json(result);
    })
    // Clear Database
    .delete(async(req,res) => {
        const reso = await User.deleteMany({},function(err){
            console.log(err);
            return res(400);
        });
        console.log("User database cleared");
        return res.status(200).json({});
    })

router
    .route("/Pesto-Admin")
    // List all Pesto
    .get(async(req,res) => {
        const result = await Pesto.find({});
        return res.status(200).json(result);
    })
    // Clear Database
    .delete(async(req,res) => {
        const reso = await Pesto.deleteMany({},function(err){
            console.log(err);
            return res(400);
        });
        console.log("User database cleared");
        return res.status(200).json({});
    });

module.exports = router;
