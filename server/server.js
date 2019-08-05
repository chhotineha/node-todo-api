//var env = process.env.NODE_ENV;
var express = require('express');
var bodyparser = require('body-parser');
var {
    db
} = require('./db/dbconnection');
var {
    User
} = require('./models/users');
var fs = require('fs');
var app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));
let crt = require('./Api/todoApi');
let login = require('./Api/LoginApi');
app.post('/studentdetails', (req, res) => {
    var jsonData = JSON.parse(fs.readFileSync('server/student.json'))
    res.send(jsonData);
    var todo = new ToDo(jsonData);
    todo.save().then(item => {
        res.status(200).send({
            msg: "item saved into database",
            val: item
        });
    }).catch(err => {
        res.status(400).send("unable to save to database");
    });
})

app.post('/todos', crt.getuserprofile);
app.post('/users', login.UserLogin);
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