var express = require('express');
var router = express.Router();
var knex = require('../db/');//TODO
var jwt = require('jsonwebtoken');

router.post('/signup', function(req, res, next) {

    //err handler
    console.log(req.body);

    knex("users").insert(req.body).returning("*").then(function(result){
            res.json(result);
        }).catch(function(err){
            console.log(err);
            res.status(400).send({errors: ['error ocurred with db call.']})
        });
});

router.post('/login', function(req, res, next) {
    // if no req body name or email
    //err handler
    console.log(req.body);
    knex('users').where({phone: req.body.phone, name: req.body.name}).returning('*')
        .then(function (user) {
            // jwt sign
            console.log(user);
            // var token = jwt.sign({id: user.id}, process.env.JWT_SECRET);
            //             res.json({
            //                 id: user.id,
            //                 name: user.username,
            //                 token: token
            //             })
        })
        .catch(function (err) {
            console.log(err);
            res.status(400).send({errors: ['Invalid Username or Phone Number']})
        })
});

module.exports = router;
