const mongoose = require('mongoose');
const user = require('./User.model');


const reportSchema = new mongoose.Schema({
  reportingUser: { type: mongoose.Schema.Types.ObjectId, ref: user ,required:true},
  reportOn:{ type: mongoose.Schema.Types.ObjectId, ref: user ,required:true},
  reportReason: { type: String, required:true }

});

module.exports = Request = mongoose.model('Report', reportSchema);
