var db = require('../db/dbconnection');
var ToDo = require('../models/todo');
//var router = require('router');

exports.getuserprofile = (req, res) => {
    console.log(req.body)
    var todo = new ToDo(req.body);
    todo.save().then(item => {
        res.status(200).send({
            msg: "item saved into database",
            val: item
        });
    }).catch(err => {
        res.status(400).send("unable to save to database");
    })
}
