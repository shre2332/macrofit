var express = require('express');

var app = express()
var social_router = express.Router()

var User = require('../models/user.js');
var Meal = require('../models/meal.js');
var Food = require('../models/food.js');
var Mac_Goal = require('../models/mac_goal.js');
var User_Stats = require('../models/user_stats.js');
var Measurement_Status = require('../models/measurement_status.js');
var Exercise_Move = require('../models/exercise_move.js');
var Exercise_Set = require('../models/exercise_set.js');
var Exercise = require('../models/exercise.js');

social_router.use(function (req, res, next) {
  console.log('social router')
  next()
})

social_router.post('/', function (req, res, next) {
  if (req.body.Food_ID &&
      req.body.Grams) {

      var mealData = {};

      Food.findById(req.body.Food_ID)
      .exec(function (error, food) {
          if (error) {
            return next(error);
          } else {
            if (food === null) {
              var err = new Error('Not found');
              err.status = 400;
              return next(err);
            } else {
              //foodMap = food;
              var new_grams = req.body.Grams;
              var food_grams = food["Grams"];
              var gram_ratio = new_grams/food_grams;

              mealData = {
                Food_ID: String(req.body.Food_ID),
                Food_Name: String(food["Name"]),
                User_ID: String(req.session.userId),
                Grams: new_grams,
                Calories: (parseInt(food["Calories"]) * gram_ratio),
                Protein: (parseInt(food["Protein"]) * gram_ratio),
                Fat: (parseInt(food["Fat"]) * gram_ratio),
                Carbs: (parseInt(food["Carbs"]) * gram_ratio),
                Fiber: (parseInt(food["Fiber"]) * gram_ratio)
              }

              Meal.create(mealData, function (error, meal) {
                if (error) {
                  return next(error);
                } else {
                 res.setHeader('Content-Type', 'application/json');
                  res.json({success: true});
                }
              });

            }
          }
      });
     
  }
})

social_router.get('/', function (req, res, next)  {

  User.find({}, function(err, users) {
    var userMap = [];

    users.forEach(function(user) {
      userMap.push(user.username);
    });
    res.setHeader('Content-Type', 'application/json');
    res.json(userMap);
  })
})

module.exports = social_router;