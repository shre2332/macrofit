var mongoose = require('mongoose');

var WorkoutSchema = new mongoose.Schema({
  Name: {
    type: String
  },
  Workout_Plan_ID: {
    type: String
  },
  Exercises_IDs: {[String]},//should be object id
  Actual_Rest_Set_Length: {[Number]},
  User_ID: {
    type: String//should be object id
  },
  Entry_Date: {
    type: Date,
    default: Date.now
  }

});

WorkoutSchema.index({Name: 'text'});

var Workout = mongoose.model('Workout', WorkoutSchema);
module.exports = Workout;