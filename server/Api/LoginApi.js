var User = require('../models/users');
var db = require('../db/dbconnection');
exports.UserLogin = (req, res) => {
    var user = new User(req.body);
    user.save().then(() => {
        return user.genrateAuthToken();
    }).then((token) => {
        res.sendFile(__dirname + '/UserLoginPage.html');
    }).catch(err => {
        res.status(400).send(err)
    })

}