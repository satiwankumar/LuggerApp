const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const config = require('config')
const { v4: uuidv4 } = require('uuid');

const user = require('./User.model');
const { boolean } = require('joi');

const LuggerSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref : user
    },
    from :{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    totalWeight:{
        type:number,
        required:true
    },
    remainingWeight:{
        type:number,
        required:true
    },
    costPerKg:{
        type:number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    flights:[
        {
            bookingDate:{
                type:Date,
                required:true
            },
            from:{
                type:String,
                required:true
            },
            to:{
                type:String,
                required:true
            },
            airline:{
                type:String,
                required:true
            },
            flightNumber:{
                type:String,
                required:true
            },
            departureDate:{
                type:Date,
                required:true
            },
            arrivalDate:{
                type:Date,
                required:true
            },


        }
    ] ,
    reviews:[
        {
            rating:{
                type:number,
                required:true
            },
            message:{
                type:String,
                required:true
            }
        }
    ],
    adminStatus:{
        type:boolean,
        default:false
    }


});








function validateLugger(lugger) {
  const schema = {
    
            from: Joi.string(),
            to: Joi.string(),
            user : Joi.objectId().required(),
            luggageWeight : Joi.number().min(0).required()   
    }

  return Joi.validate(lugger, schema);
}


const Lugger = mongoose.model('Lugger', LuggerSchema);

module.exports.Lugger = Lugger;
module.exports.validate = validateLugger
