var mongoose = require('mongoose');

var MacGoalSchema = new mongoose.Schema({
  User_ID: {
    type: String,//should be object id
    required: true,
    trim: true
  },
  Calories: {
    type: Number,
    required: true,
  },
  Protein: {
    type: Number,
    required: true,
  },
  Fat: {
    type: Number,
    required: true,
  },
  Carbs: {
    type: Number,
    required: true,
  },
  Fiber: {
    type: Number,
    required: true,
  },
  Entry_Date: {
    type: Date,
    default: Date.now
  },
    Active: {
    type: Boolean,
    default: true
  }
});

var Mac_Goal = mongoose.model('Mac_Goal', MacGoalSchema);
module.exports = Mac_Goal;
