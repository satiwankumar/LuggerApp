const Joi = require('joi');
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    message: {
        type: String,
        required: true
    }

});

// .set('timestamps',true)








function validateContact(user) {
    const schema = {
      
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        message: Joi.string().required()
    };

    return Joi.validate(user, schema);
}


const Contact = mongoose.model('Contact', contactSchema);

module.exports.Contact = Contact;
module.exports.validate = validateContact