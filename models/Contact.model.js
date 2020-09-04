
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    
    },
    message: {
        type: String,
        required: true
    }

});

// .set('timestamps',true)









module.exports=  Contact = mongoose.model('Contact', contactSchema);
