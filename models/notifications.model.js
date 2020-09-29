const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user  =  require('../models/User.model')
//creates new instance of mongoose.schema
const NotificationSchema = new Schema ({
  

user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: user
    },
  
  title: {
    type: String,
    required: [true, 'Notfication Title']
  },
  body: {
    type: String,
    required: [true, 'Notification Message']
  },
  date: {
    type: Date,
    default: Date.now,
  },
  view: {
    type: String
    //TODO may have to require later when listener is added to pouchdb
  }

});



//export model to be used in routes/api.js
module.exports = Notification=mongoose.model('Notification', NotificationSchema);