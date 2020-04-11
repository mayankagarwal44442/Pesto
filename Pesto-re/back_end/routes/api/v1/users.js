const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var config = require("config");
// Load input validation
const validateRegisterInput = require("../../../Utils/register");
const validateLoginInput = require("../../../Utils/login");
// Load User model
const User = require("../../../models/User");

router.post("/register", (req,res) => {
    // Checking whether details provided are valid or not
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid)
        return res.status(400).json(errors);

    // Updating the database
    User.findOne({email : req.body.email}).then(user=> {
        if (user)
            return res.status(400).json({email : "Email Aldready exists"});
        else
        {
            const newUser = new User({
                name : req.body.name,
                email : req.body.email,
                password : req.body.password,
                address : req.body.address,
                phonenum : req.body.phonenum
            });
            // Hashing passwords
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                  if (err) throw err;
                  newUser.password = hash;
                  newUser
                    .save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
                });
            });
            console.log("success");
        }
    });
});

router.post("/login", (req,res) => {
    // Checking whether details provided are valid or not
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid)
        return res.status(400).json(errors);

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email}).then(user => {
        if (!user)
            return res.status(400).json({InvalidEmail: "Email not found"});
        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
              // User matched
              // Create JWT Payload
              const payload = {
                id: user.id,
                name: user.name
              };
        // Sign token
              jwt.sign(
                payload,
                config.get("secretOrKey"),
                {
                  expiresIn: 31556926 // 1 year in seconds
                },
                (err, token) => {
                  res.json({
                    success: true,
                    token: user.name + " = " + token
                  });
                }
              );
            } else {
              return res
                .status(400)
                .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
});

module.exports = router;
