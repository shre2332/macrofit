var mongoose = require('mongoose');

var MealSchema = new mongoose.Schema({
  Food_ID: {
    type: String,//should be object id
    required: true,
    trim: true
  },
  User_ID: {
    type: String,//should be object id
    required: true,
    trim: true
  },
  Grams: {
    type: Number,
    required: true
  },
  Entry_Date: {
    type: Date,
    default: Date.now
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

var Meal = mongoose.model('Meal', MealSchema);
module.exports = Meal;
