var express = require('express');

var app = express()
var progress_router = express.Router()

var User = require('../models/user.js');
var Meal = require('../models/meal.js');
var Food = require('../models/food.js');
var Mac_Goal = require('../models/mac_goal.js');
var User_Stats = require('../models/user_stats.js');
var Measurement_Status = require('../models/measurement_status.js');
var Exercise_Move = require('../models/exercise_move.js');
var Exercise_Move = require('../models/exercise_set.js');
var Exercise_Move = require('../models/exercise.js');

progress_router.use(function (req, res, next) {
  console.log('progress router')
  next()
})

progress_router.post('/', function (req, res, next)  {
  if (/*req.body.date &&
      req.body.weight &&
      req.body.bp_s &&
      req.body.bp_d &&
      req.body.bf*/true) {

      console.log(req.body.date + " " +
      req.body.weight + " " +
      req.body.bp_s + " " +
      req.body.bp_d + " " +
      req.body.bf);

        var MSData = {
          User_ID: String(req.session.userId),
          Current_Weight: req.body.weight,
          Body_Fat_Percentage: req.body.bf,
          BP_D: req.body.bp_d,
          BP_S: req.body.bp_s,
          Entry_Date: req.body.date
        }

        Measurement_Status.create(MSData, function (error, ms) {
          if (error) {
            return next(error);
          } else {
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true});
          }
        });
  }
})


module.exports = progress_router;