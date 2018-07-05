var mongoose = require('mongoose');

var WorkoutPlanSchema = new mongoose.Schema({
  Name: {
    type: String
  },
  type: {
    type: String
  },
  circuit: {
    type: Boolean,
    default: false
  },
  Exercise_Sets_IDs: {
    type:[String]
  },//should be object id
  Reps: {
    type: [Number]
  },
  Rest_Set_Length: {
      type: [Number]
  },
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