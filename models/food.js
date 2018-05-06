var mongoose = require('mongoose');

var FoodSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    trim: true
  },
  Grams: {
    type: Number,
    required: true
  },
  Calories: {
    type: Number,
    required: true,
  },
  Protein: {
    type: Number,
    required: true,
  },
  Fat: {
    type: Number,
    required: true,
  },
  Carbs: {
    type: Number,
    required: true,
  },
  Fiber: {
    type: Number,
    required: true,
  },
  Entry_Date: {
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
  }

});

var Food = mongoose.model('Food', FoodSchema);
module.exports = Food;
