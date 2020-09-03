const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const config = require('config')
const { v4: uuidv4 } = require('uuid');

const user = require('./User.model');
const { boolean } = require('joi');

const LuggerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: user
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    totalWeight: {
        type: Number,
        required: true
    },
    remaningWeight: {
        type: Number,
        required: true
    },
    
    costPerKg: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    delivery:{
        type:Boolean,
        required:true,
        default:false
    },
    airline: {
        type: String,
        required: true
    },
    flightNumber: {
        type: String,
        required: true
    },
    travelDate: {
        type: Date,
        required: true
    },
    arrivalDate: {
        type: Date,
        required: true
    },
    turnAroundTime:{
        type : Number,
        required:true
    },

        
   
    reviews: [
        {
            rating: {
                type: Number,
               
            },
            message: {
                type: String,
               
            }
        }
    ],
    adminStatus: {
        type: Boolean,
        default: false
    }


});












module.exports =  Lugger = mongoose.model('Lugger', LuggerSchema);
