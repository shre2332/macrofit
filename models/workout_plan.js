var mongoose = require('mongoose');

var WorkoutPlanSchema = new mongoose.Schema({
  Name: {
    type: String
  },
  Workout_Sets_IDs: [String],
  Rest_Between_Workouts: [Number],
  User_ID: {
    type: String,//should be object id
  },
  Entry_Date: {
    type: Date,
    default: Date.now
  }

});

WorkoutPlanSchema.index({Name: 'text'});

var Workout_Plan = mongoose.model('Workout_Plan', WorkoutPlanSchema);
module.exports = Workout_Plan;