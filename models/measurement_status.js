var mongoose = require('mongoose');

var MeasurementStatusSchema = new mongoose.Schema({
  User_ID: {
    type: String,//should be object id
    required: true
  },
  Current_Weight: {
    type: Number
  },
  Body_Fat_Percentage: {
    type: Number
  },
  BP_D: {
    type: Number
  },
  BP_S: {
    type: Number
  },
  Entry_Date: {
    type: Date,
    default: Date.now
  }
});

var MeasurementStatus = mongoose.model('MeasurementStatus', MeasurementStatusSchema);
module.exports = MeasurementStatus;
