const mongoose = require('mongoose');
const User = require('./User.model')

const reviewSchema = new mongoose.Schema({

  
            rating: {
                type: Number,

            },
            message: {
                type: String,

            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: User,
                required:true
            },
            luggerUser: { type: mongoose.Schema.Types.ObjectId, 
                ref: User, required: true },

        }
    

);

// .set('timestamps',true)




module.exports = Review = mongoose.model('Review', reviewSchema);
