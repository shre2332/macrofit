var mongoose = require('mongoose');

var Macro_Plan_Schema = new mongoose.Schema({
  User_ID: {
    type: String,//should be object id
    required: true,
    trim: true
  },
  Cycle_Length: {
    type: Number
  },
  Calories: {[Number]},
  Fat: {[Number]},
  Carbs: {[Number]},
  Protein: {[Number]},
  Fiber: {[Number]},
  Start_Date: {
    type: Date,
    default: Date.now
  },
  End_Date: {
    type: Date
  },
  Indefinite: {
    type: Boolean
  }
});

var Macro_Plan = mongoose.model('Macro_Plan', Macro_Plan_Schema);
module.exports = Macro_Plan;
