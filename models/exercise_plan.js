var mongoose = require('mongoose');

var ExercisePlanSchema = new mongoose.Schema({
  Name: {
    type: String
  },

  Workout_Plans_IDs_and_Days: {[[String]]},
  User_ID: {
    type: String,//should be object id
    required: true
  },
  Entry_Date: {
    type: Date,
    default: Date.now
  }

});

ExercisePlanSchema.index({Name: 'text'});

var Exercise_Plan = mongoose.model('Exercise_Plan', ExercisePlanSchema);
module.exports = Exercise_Plan;