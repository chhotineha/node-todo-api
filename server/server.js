var env = process.env.NODE_ENV;
var express = require('express');
var bodyparser = require('body-parser');
var { mongoose } = require('./db/mongoose');
var { ToDo } = require('./models/todo');
var { User } = require('./models/users');
var app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.post('/todos', (req, res) => {
    var todo = new ToDo(req.body);
    todo.save().then(item => {
        res.status(200).send({ msg: "item saved into database", val: item });
    }).catch(err => {
        res.status(400).send("unable to save to database");
    });

});
app.post('/users', (req, res) => {
    var user = new User(req.body);
    user.save().then(() => {
        return user.genrateAuthToken();
    }).then((token) => {
        res.sendFile(__dirname + '/UserLoginPage.html');
    }).catch(err => {
        res.status(400).send(err)
    })

})
//post/users/login{email,password}

app.post('/users/login', (req, res) => {
    var user = req.body;
    console.log(user)
})

app.use("/", (req, res) => {
    res.sendFile(__dirname + "/Loginpage.html");
});
app.listen(3000, () => {
    console.log('started on port 3000')

})
module.exports = {
    app: app
}


