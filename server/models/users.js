var mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 10,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not valid email'
        }

    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            require: true
        },
        token: {
            type: String,
            require: true
        }
    }]


});
UserSchema.methods.genrateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({ email: user.email, _id: user._id.toHexString() }, 'abc123').toString();
    user.tokens.push({ access, token });
    return user.save().then(() => {
        return token;
    })
}
UserSchema.statics.findByCredetial
UserSchema.pre('save', function (next) {
    var user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            })
        });

    } else {
        next();
    }

})

var User = mongoose.model('User', UserSchema);
module.exports = {
    User: User
}