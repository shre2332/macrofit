var mongoose = require('mongoose');

var MealSchema = new mongoose.Schema({
  Food_ID: {
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
  }
});

var Meal = mongoose.model('Meal', MealSchema);
module.exports = Meal;
