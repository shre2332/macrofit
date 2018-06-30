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

social_router.get('/', function (req, res, next) {
  
  var social_profile = {
        Exercise_Plans: [],
        Macro_Goals: [],
        Macro_Plans: [],
        Measurement_Statuses: [],
        Workout_Plans: []
      }

    Exercise_Plan.find({"User_ID": req.session.userId}, function(err, plans) {
    if (err) return handleError(err);
      
      var arrayLength = plans.length;
      for (var i = 0; i < arrayLength; i++) {
        social_profile.Exercise_Plans.push(plans[i]);
      }
    }

    Mac_Goal.find({"User_ID": req.session.userId}, function(err, goal) {
    if (err) return handleError(err);
      
      var arrayLength = goal.length;
      for (var i = 0; i < arrayLength; i++) {
        social_profile.Macro_Goals.push(goal[i]);
      }
    }

    Macro_Plan.find({"User_ID": req.session.userId}, function(err, plan) {
    if (err) return handleError(err);
      
      var arrayLength = plan.length;
      for (var i = 0; i < arrayLength; i++) {
        social_profile.Macro_Plans.push(plan[i]);
      }
    }

    Measurement_Status.find({"User_ID": req.session.userId}, function(err, stats) {
    if (err) return handleError(err);
      
      var arrayLength = stats.length;
      for (var i = 0; i < arrayLength; i++) {
        social_profile.Measurement_Statuses.push(stats[i]);
      }
    }

    Workout_Plan.find({"User_ID": req.session.userId}, function(err, plan) {
    if (err) return handleError(err);
      
      var arrayLength = plan.length;
      for (var i = 0; i < arrayLength; i++) {
        social_profile.Workout_Plans.push(plan[i]);
      }
    }

    res.setHeader('Content-Type', 'application/json');
    res.json(social_profile);
  });
})


// get /remaining
// remaining macros for today
social_router.get('/remaining', function (req, res) {

  var day = new Date();
  
  var daily_totals = {
        Calories: 0,
        Protein: 0,
        Fat: 0,
        Carbs: 0,
        Fiber: 0
      }
  
  Meal.find({"User_ID": req.session.userId, "Entry_Date": {$gte: new Date(day.getFullYear(),day.getMonth(),day.getDate())}}, function(err, meals) {
    if (err) return handleError(err);
      
    var arrayLength = meals.length;
    for (var i = 0; i < arrayLength; i++) {
    daily_totals["Calories"] = daily_totals["Calories"] + parseInt(meals[i]["Calories"]);
    daily_totals["Protein"] = daily_totals["Protein"] + parseInt(meals[i]["Protein"]);
    daily_totals["Fat"] = daily_totals["Fat"] + parseInt(meals[i]["Fat"]);
    daily_totals["Carbs"] = daily_totals["Carbs"] + parseInt(meals[i]["Carbs"]);
    daily_totals["Fiber"] = daily_totals["Fiber"] + parseInt(meals[i]["Fiber"]);
     }
    
    var remData = {};

    Mac_Goal.findOne({"User_ID": String(req.session.userId), "Active": true})
    .exec(function (error, goal) {
      if (error) {
      return next(error);
    } else {
      if (goal === null) {
        var err = new Error('Not found');
        err.status = 400;
        res.setHeader('Content-Type', 'application/json');
        res.json({no_goal: true});
        //return next(err);
      } else {

         console.log(parseInt(goal["Calories"]));
             console.log(daily_totals["Calories"]);

         remData = {
           no_goal: false,
             Calories: parseInt(goal["Calories"]) - daily_totals["Calories"],
             Protein: parseInt(goal["Protein"]) - daily_totals["Protein"],
           Fat: parseInt(goal["Fat"]) - daily_totals["Fat"],
           Carbs: parseInt(goal["Carbs"]) - daily_totals["Carbs"],
           Fiber: parseInt(goal["Fiber"]) - daily_totals["Fiber"]
           }
            
           console.log(remData);
       res.setHeader('Content-Type', 'application/json');
         res.json(remData);
      }
    }
      })
    })
})

module.exports = social_router;