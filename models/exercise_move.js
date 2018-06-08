var mongoose = require('mongoose');

var ExerciseMoveSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true
  },
  Pectorals: {
    type: Number,
    required: true,
    default: 0
  },
  Latimus_Dorsi: {
    type: Number,
    required: true,
    default: 0
  },
  Bicep: {
    type: Number,
    required: true,
    default: 0
  },
  Tricep: {
    type: Number,
    required: true,
    default: 0
  },
  Mid_Deltiod: {
    type: Number,
    required: true,
    default: 0
  },
  Front_Deltoid: {
    type: Number,
    required: true,
    default: 0
  },
  Rear_Deltoid: {
    type: Number,
    required: true,
    default: 0
  },
  Forarms: {
    type: Number,
    required: true,
    default: 0
  },
  Abdominals: {
    type: Number,
    required: true,
    default: 0
  },
  Rhomboids: {
    type: Number,
    required: true,
    default: 0
  },
  Lower_Back: {
    type: Number,
    required: true,
    default: 0
  },
  Upper_Trapizius: {
    type: Number,
    required: true,
    default: 0
  },
  Mid_Trapizius: {
    type: Number,
    required: true,
    default: 0
  },
  Lower_Trapizius: {
    type: Number,
    required: true,
    default: 0
  },
  Obliques: {
    type: Number,
    required: true,
    default: 0
  },
  Quadriceps: {
    type: Number,
    required: true,
    default: 0
  },
  Hamstrings: {
    type: Number,
    required: true,
    default: 0
  },
  Glute_Max: {
    type: Number,
    required: true,
    default: 0
  },
  Glute_Min: {
    type: Number,
    required: true,
    default: 0
  },
  Calves: {
    type: Number,
    required: true,
    default: 0
  },
  Cardio: {
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

//ExerciseMoveSchema.index({Name: 'text'});

var Exercise_Move = mongoose.model('Exercise_Move', ExerciseMoveSchema);
module.exports = Exercise_Move;