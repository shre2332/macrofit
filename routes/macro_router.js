var express = require('express');

var app = express()
var macro_router = express.Router()

var User = require('../models/user.js');
var Meal = require('../models/meal.js');
var Food = require('../models/food.js');
var Mac_Goal = require('../models/mac_goal.js');
var User_Stats = require('../models/user_stats.js');
var Measurement_Status = require('../models/measurement_status.js');
var Exercise_Move = require('../models/exercise_move.js');

macro_router.use(function (req, res, next) {
  console.log('macro router')
  next()
})

macro_router.get('/', function (req, res, next) {

  var day = new Date();
  
  var daily_totals = {
        Calories: 0,
        Protein: 0,
        Fat: 0,
        Carbs: 0,
        Fiber: 0
      }
  
  //console.log(new Date(day.getFullYear(),day.getMonth(),day.getDate()));
  //Meal.find({"User_ID": req.session.userId, "Entry_Date": {"$gte": new Date(day.getYear(), day.getMonth(), day.getDate()), "$lt": new Date(day.getYear(), day.getMonth(), day.getDate()+1)}}, function(err, meals) {
  Meal.find({"User_ID": req.session.userId, "Entry_Date": {$gte: new Date(day.getFullYear(),day.getMonth(),day.getDate())}}, function(err, meals) {
    if (err) return handleError(err);
      
      var arrayLength = meals.length;
    for (var i = 0; i < arrayLength; i++) {
          //console.log(meals[i]["Entry_Date"]);
      daily_totals["Calories"] = daily_totals["Calories"] + parseInt(meals[i]["Calories"]);
      daily_totals["Protein"] = daily_totals["Protein"] + parseInt(meals[i]["Protein"]);
      daily_totals["Fat"] = daily_totals["Fat"] + parseInt(meals[i]["Fat"]);
      daily_totals["Carbs"] = daily_totals["Carbs"] + parseInt(meals[i]["Carbs"]);
      daily_totals["Fiber"] = daily_totals["Fiber"] + parseInt(meals[i]["Fiber"]);
    }

    //console.log("done");
    //return daily_totals;

    //console.log(daily_totals);
    res.setHeader('Content-Type', 'application/json');
      res.json(daily_totals);
  });
})


// get /remaining
// remaining macros for today
macro_router.get('/remaining', function (req, res) {

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

module.exports = macro_router;