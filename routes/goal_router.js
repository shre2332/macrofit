var express = require('express');

var app = express()
var goal_router = express.Router()

var User = require('../models/user.js');
var Meal = require('../models/meal.js');
var Food = require('../models/food.js');
var Mac_Goal = require('../models/mac_goal.js');
var User_Stats = require('../models/user_stats.js');
var Measurement_Status = require('../models/measurement_status.js');
var Exercise_Move = require('../models/exercise_move.js');
var Exercise_Set = require('../models/exercise_set.js');
var Exercise = require('../models/exercise.js');

goal_router.use(function (req, res, next) {
  console.log('goal router')
  next()
})

goal_router.post('/macro', function (req, res, next) {
  if (req.body.calories &&
      req.body.protein &&
      req.body.fat &&
      req.body.carbs &&
      req.body.fiber) {

        var macGoalData = {
          User_ID: String(req.session.userId),
          Calories: req.body.calories,
          Protein: req.body.protein,
          Fat: req.body.fat,
          Carbs: req.body.carbs,
          Fiber: req.body.fiber
        }

        Mac_Goal.create(macGoalData, function (error, goal) {
          if (error) {
            return next(error);
          } else {
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true});
          }
        });
  }
})

goal_router.get('/', function (req, res, next) {

  Mac_Goal.find({"User_ID": req.session.userId}, function(err, goals) {
    var goalsMap = {};

    goals.forEach(function(goal) {
      goalsMap[goal._id] = goal;
    });
    res.setHeader('Content-Type', 'application/json');
    res.json(goalsMap);
  })
})

goal_router.delete('/:id', function (req, res, next) {

    var id = req.params.id;

    Mac_Goal.findByIdAndRemove(id, function(err) {
        if (err)
            res.send(err);
        else
            res.json({success: true});
    });
})


module.exports = goal_router;