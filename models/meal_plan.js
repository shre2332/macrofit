var mongoose = require('mongoose');

var MealPlanSchema = new mongoose.Schema({
  Food_IDs: [String],
  Name: {
    type: String
  },
  Author: {
    type: String
  },
  Description: {
    type: String
  },
  Macro_Goal_IDs: [String]
});

var Meal_Plan = mongoose.model('Meal_Plan', MealPlanSchema);
module.exports = Meal_Plan;
