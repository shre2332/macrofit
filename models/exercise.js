var mongoose = require('mongoose');

var ExerciseSchema = new mongoose.Schema({
  Name: {
    type: String,
  },
  Exercise_Set_ID: {
    type: String,//should be object id
    required: true
  }
  Reps: [Number],
  Sets: {
    type: Number,
    required: true,
    default: 0
  },
  Rest: [Number],
  Pace: [Number],
  User_ID: {
    type: String,//should be object id
    required: true
  },
  Entry_Date: {
    type: Date,
    default: Date.now
  }

});

ExerciseSchema.index({Name: 'text'});

var Exercise = mongoose.model('Exercise', ExerciseSchema);
module.exports = Exercise;