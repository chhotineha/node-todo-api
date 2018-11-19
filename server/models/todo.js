var mongoose = require('mongoose');
var ToDO = mongoose.model('ToDo', {
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
module.exports = {
    ToDo: ToDO
}