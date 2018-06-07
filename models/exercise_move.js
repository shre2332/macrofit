var mongoose = require('mongoose');

var ExerciseMoveSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true
  },
  Pectorals: {
    type: Number,
    required: true
  },
  Latimus_Dorsi: {
    type: Number,
    required: true,
  },
  Bicep: {
    type: Number,
    required: true,
  },
  Tricep: {
    type: Number,
    required: true,
  },
  Mid_Deltiod: {
    type: Number,
    required: true,
  },
  Front_Deltoid: {
    type: Number,
    required: true,
  },
  Rear_Deltoid: {
    type: Number,
    required: true,
  },
  Forarms: {
    type: Number,
    required: true,
  },
  Abdominals: {
    type: Date,
    default: Date.now
  },
  Rhomboids: {
    type: Date,
    default: Date.now
  },
  Lower_Back: {
    type: Date,
    default: Date.now
  },
  Upper_Trapizius: {
    type: Date,
    default: Date.now
  },
  Mid_Trapizius: {
    type: Date,
    default: Date.now
  },
  Lower_Trapizius: {
    type: Date,
    default: Date.now
  },
  Obliques: {
    type: Date,
    default: Date.now
  },
  Quadriceps: {
    type: Date,
    default: Date.now
  },
  Hamstrings: {
    type: Date,
    default: Date.now
  },
  Glute_Max: {
    type: Date,
    default: Date.now
  },
  Glute_Min: {
    type: Date,
    default: Date.now
  },
  Calves: {
    type: Date,
    default: Date.now
  },
  Cardio: {
    type: Date,
    default: Date.now
  },
  Custom_Flag: {
    type: Boolean,
    required: true,
    default: false
  },
  Custom_Creator_ID: {
    type: String,//should be object id
    default: null
  },
  
  //food label data
  Serving_Size: {
    type: Number
  },
  Calories_From_Fat: {
    type: Number
  }

});

//ExerciseMoveSchema.index({Name: 'text'});

var Exercise_Move = mongoose.model('Exercise_Move', ExerciseMoveSchema);
module.exports = Exercise_Move;
