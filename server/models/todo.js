var mongoose = require('mongoose');
var ToDOSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
        minlength: 1
    },
    lastName: {
        type: String,
        require: true,
        minlength: 1
    },
    hobbies: {
        type: String,
        require: true,
        minlength: 1
    }

});
module.exports = mongoose.model('ToDo', ToDOSchema);