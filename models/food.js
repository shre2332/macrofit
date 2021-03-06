var mongoose = require('mongoose');

var FoodSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true
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
  Net_Carbs: {
    type: Number
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
  },
  
  Serving_Size_Type: {
    //1=cups, 2=ounces, 2=grams, 4=units
    type: Number
  },
  Cups_Present: {
    type: Boolean,
    required: true,
    default: false
  },
  Cups: {
    type: Number
  },
  Ounces_Present: {
    type: Boolean,
    required: true,
    default: false
  },
  Ounces: {
    type: Number
  },
  Units_Present: {
    type: Boolean,
    required: true,
    default: false
  },
  Units: {
    type: Number
  },
  Default_Serving_Size: {
    type: Number
  },

  //food label data
  Serving_Size: {
    type: Number
  },
  Calories_From_Fat: {
    type: Number
  },
  Saturated_Fat: {
    type: Number
  },
  Trans_Fat: {
    type: Number
  },
  Cholesterol: {
    type: Number
  },
  Sodium: {
    type: Number
  },
  Sugars: {
    type: Number
  },
  
  //major minerals
  Calcium: {
    type: Number
  },
  Chloride: {
    type: Number
  },
  Magnesium: {
    type: Number
  },
  Phosphorus: {
    type: Number
  },
  Potasium: {
    type: Number
  },
  Sulfur: {
    type: Number
  },
  
  //trace minerals
  Boron: {
    type: Number
  },
  Cobalt: {
    type: Number
  },
  Chlorine: {
    type: Number
  },
  Chromium: {
    type: Number
  },
  Copper: {
    type: Number
  },
  Fluoride: {
    type: Number
  },                                 
  Iodine: {
    type: Number
  },
  Iron: {
    type: Number
  },
  Lithium: {
    type: Number
  },
  Manganese: {
    type: Number
  },
  Molybdenum: {
    type: Number
  },
  Selenium: {
    type: Number
  },
  Sodium: {
    type: Number
  },
  Zinc: {
    type: Number
  },
                                     
  //vitamins                                 
  B1_Thiamin: {
    type: Number
  },
  B2_Riboflavin: {
    type: Number
  },
  B3_Niacin: {
    type: Number
  },
  B5_Pantothenic_Acid: {
    type: Number
  },
  B6_Group: {
    type: Number
  },
  B7_Biotin: {
    type: Number
  },
  B8_Ergadenylic_Acid: {
    type: Number
  },
  B9_Folic_Acid: {
    type: Number
  },
  B12_Cyanocobalamin: {
    type: Number
  },
  Choline: {
    type: Number
  },
  A_Retinol: {
    type: Number
  },
  C_Absorbic_Acid: {
    type: Number
  },
  D: {
    type: Number
  },
  E_Tocopherol: {
    type: Number
  },
  K: {
    type: Number
  },
  Carotenoids: {
    type: Number
  },

  Food_Image: { data: Buffer, contentType: String }

});

FoodSchema.index({Name: 'text'});

var Food = mongoose.model('Food', FoodSchema);
module.exports = Food;
