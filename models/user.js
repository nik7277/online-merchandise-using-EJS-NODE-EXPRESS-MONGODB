const mongoose  = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const Joi = require('Joi');

const UserSchema  = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 25
    },
    email:{
        type: String,
        required: true,
        unique:true,
        trim: true,
        validate: {
            validator: function(v){
                return validator.isEmail(v);
                },
                message: 'Invalid e-mail'
            }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength: 8,
    },
    address:{
        type: String,
        required: true,
        trim: true
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
});
UserSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id, name: this.name ,isAdmin: this.isAdmin}, 'jwtSecretToken');
    return token
}
const User = mongoose.model('User', UserSchema);

function validateUser(user){
    const schema = {
        name: Joi.string().min(3).max(25).required(),
        email: Joi.string().min(8).max(255).required().email(),
        password: Joi.string().min(8).max(255).required(),
        address: Joi.string().required(),
        isAdmin: Joi.boolean()
    }
    return Joi.validate(user, schema);
}

exports.User = User;
exports.validateUser = validateUser;