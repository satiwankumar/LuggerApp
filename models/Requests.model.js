const mongoose = require('mongoose');
const user = require('./User.model');
const lugger = require('./Lugger.model');
const { v4: uuidv4 } = require('uuid');

const LugRequestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: user },
  lugger: { type: mongoose.Schema.Types.ObjectId, ref: lugger, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  luggageWeight: { type: String, required: true },
  pickUpAddress: { type: String, required: true },
  dropOffAddress: { type: String, required: true },
  images: { type: [String] },
  additionalNote: { type: String, required: true },
  status: { type: Number, default: false }
});

module.exports = Requests = mongoose.model('Request', LugRequestSchema);
