const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const config = require('config');
const { date } = require('joi');

const UserSchema = new mongoose.Schema({
    image:
    {
        type: String
    },
    firstname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    lastname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    // passwordResetToken: { type: String, default: "" },
    // passwordResetExpires: { type: Date, default: Date("2018/06/06") },
    resetCode: {type: Number, default: ""},
    status: {type: Number, default: 1},
    
    isAdmin: {
        type: Boolean,
        default: false,
        required: true
    }
});

UserSchema.set('timestamps', true)








 
UserSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({
        _id: this._id, isAdmin: this.isAdmin ,status:this.status
     },config.get('jwtSecret'),{expiresIn :  '24h' });
    return token;
}


// function validateUser(user) {
//     const schema =Joi.object( {
//         firstname: Joi.string().min(5).max(50).required(),
//         lastname: Joi.string().min(5).max(50).required(),
//         email: Joi.string().min(5).max(255).required().email(),
//         password: Joi.string().min(5).max(255).required()
//     });

//     return schema.validate(user, schema);
// }


module.exports = User = mongoose.model('user', UserSchema)
// module.exports.validate = validateUser