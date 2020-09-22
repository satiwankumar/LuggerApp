const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const config = require('config')
const { v4: uuidv4 } = require('uuid');

const user = require('./User.model');


const LuggerSchema = new mongoose.Schema({
    //  _id: {
    //     type: String,
    //      default: function genUUID() {
    //           uuidv4()
        
    //   }},
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
    remainingWeight: {
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
     
    receivedRequests: [
        {
            userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: user
        }
        }
    ],

         
   
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
    status: { type: Number, default: false },



});












module.exports =  Lugger = mongoose.model('Lugger', LuggerSchema);
