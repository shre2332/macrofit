var mongoose = require('mongoose');

var MeasurementStatusSchema = new mongoose.Schema({
  User_ID: {
    type: String,//should be object id
    required: true,
    trim: true
  },
  current_weight: {
    type: Number,
    unique: true,
  },
  Body_Fat_Percentage: {
    type: Number
  },
  Entry_Date: {
    type: Date,
    default: Date.now
  }
});

var MeasurementStatus = mongoose.model('MeasurementStatus', MeasurementStatusSchema);
module.exports = MeasurementStatus;
