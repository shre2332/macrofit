var mongoose = require('mongoose');

var WeightGoalSchema = new mongoose.Schema({
  User_ID: {
    type: String,//should be object id
    required: true,
    trim: true
  },
  Start_Weight: {
    type: Number,
    required: true,
  },
  Goal_Weight: {
    type: Number,
    required: true,
  },
  Entry_Date: {
    type: Date,
    default: Date.now
  },
  Start_Date: {
    type: Date,
    default: Date.now
  },
  End_Date: {
    type: Date,
    default: Date.now
  },
  Active: {
    type: Boolean,
    default: true
  }
});

var Weight_Goal = mongoose.model('Weight_Goal', WeightGoalSchema);
module.exports = Weight_Goal;