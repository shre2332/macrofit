var express = require('express');

var app = express()
var meal_router = express.Router()

var User = require('../models/user.js');
var Meal = require('../models/meal.js');
var Food = require('../models/food.js');
var Mac_Goal = require('../models/mac_goal.js');
var User_Stats = require('../models/user_stats.js');
var Measurement_Status = require('../models/measurement_status.js');
var Exercise_Move = require('../models/exercise_move.js');
var Exercise_Set = require('../models/exercise_set.js');
var Exercise = require('../models/exercise.js');

var moment = require('moment');
moment().format();

meal_router.use(function (req, res, next) {
  console.log('meal router');
  next()
})

meal_router.post('/', function (req, res, next) {
  if (req.body.Food_ID &&
      req.body.Grams) {

      var day = new Date();
      var input_date = req.body.Entry_Date;
      var moment_start = moment(input_date);

      var diff = (moment_start.diff(moment(), 'days'));
      console.log("time diff: "+diff);

      var day_start = new Date(moment(input_date));


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
                Fiber: (parseInt(food["Fiber"]) * gram_ratio),
                Net_Carbs: (parseInt(food["Carbs"]) - parseInt(food["Fiber"])),
              }

              if (diff != 0) {
                mealData.Entry_Date = input_date;
              }

              /*console.log(req.body.Entry_Date);
              console.log(moment(req.body.Entry_Date).toDate());
              console.log(moment());
              console.log(moment(req.body.Entry_Date));
              console.log(moment(req.body.Entry_Date).startOf('day'));
              console.log(moment(req.body.Entry_Date).endOf('day'));*/
              

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

// get /meals/day
// meals for specified day
meal_router.get('/day/:day', function (req, res, next) {

  var day = new Date();
  var input_date = (req.params.day).replace(/-/g, "/");

  var day_start = new Date(moment(input_date));
  var day_end = new Date(moment(input_date).add(24, 'hours'));

  //console.log(day_start);
  //console.log(day_end);

  Meal.find({"User_ID": req.session.userId, "Entry_Date": {$gte: day_start, $lt: day_end}}, function(err, meals) {
    var mealMap = {};

    meals.forEach(function(meal) {
      mealMap[meal._id] = meal;
    });

  res.setHeader('Content-Type', 'application/json');
    res.json(mealMap);
  })

})

meal_router.get('/today', function (req, res, next) {

  var day = new Date();

  Meal.find({"User_ID": req.session.userId, "Entry_Date": {$gte: new Date(day.getFullYear(),day.getMonth(),day.getDate())}}, function(err, meals) {
    var mealMap = {};

    meals.forEach(function(meal) {
      mealMap[meal._id] = meal;
    });

  res.setHeader('Content-Type', 'application/json');
    res.json(mealMap);
  })

})

// get /meal
// get one meal
meal_router.get('/:id', function (req, res, next) {

  var id = req.params.id;

    Meal.findById(id, function (err, meal) {
  
    res.setHeader('Content-Type', 'application/json');
      res.json(meal);
    })
})

meal_router.delete('/:id', function (req, res, next) {

    var id = req.params.id;

    Meal.findByIdAndRemove(id, function(err) {
        if (err)
            res.send(err);
        else
            res.json({success: true});
    });
})

module.exports = meal_router;