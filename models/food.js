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
  }
});

var Food = mongoose.model('Food', FoodSchema);
module.exports = Food;
