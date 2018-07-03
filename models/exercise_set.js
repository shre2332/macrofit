var mongoose = require('mongoose');

var ExerciseSetSchema = new mongoose.Schema({
  Name: {
    type: String
  },
  Exercise_Move_ID: {
    type: String,//should be object id
    required: true
  },
  Reps: {
    type: Number,
    required: true,
    default: 0
  },
  Sets: {
    type: Number,
    required: true,
    default: 0
  },
  Rest: {
    type: Number,
    required: true,
    default: 0
  },
  Pace: {
    type: Number,
    required: true,
    default: 0
  },
  Custom_Flag: {
    type: Boolean,
    required: true,
    default: false
  },
  Custom_Creator_ID: {
    type: String,//should be object id
    default: null
  }

});

ExerciseSetSchema.index({Name: 'text'});

var Exercise_Set = mongoose.model('Exercise_Set', ExerciseSetSchema);
module.exports = Exercise_Set;