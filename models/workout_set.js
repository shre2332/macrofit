var mongoose = require('mongoose');

var WorkoutSetSchema = new mongoose.Schema({
  Name: {
    type: String
  },
  Workout_Plan_ID: {
    type: String
  },
  Exercises_IDs: {
    type: [String]
  },
  Actual_Rest_Set_Length: {
    type: [Number]
  },
  User_ID: {
    type: String//should be object id
  },
  Entry_Date: {
    type: Date,
    default: Date.now
  }

});

WorkoutSetSchema.index({Name: 'text'});

var Workout_Set = mongoose.model('Workout_Set', WorkoutSetSchema);
module.exports = Workout_Set;