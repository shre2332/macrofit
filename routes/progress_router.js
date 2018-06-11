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
var Exercise_Set = require('../models/exercise_set.js');
var Exercise = require('../models/exercise.js');

var moment = require('moment');
moment().format();

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

progress_router.get('/check/:period', function (req, res, next)  {

        console.log(req.params.period);
        var now = moment();
        var start = moment();
        if (req.params.period == 1){
            start = moment().subtract(1, 'weeks');
        } else if (req.params.period == 2) {
            start = moment().subtract(2, 'weeks');
        } else if (req.params.period == 3){
            start = moment().subtract(1, 'months');
        } else if (req.params.period == 4){
            start = moment().subtract(2, 'months');
        } else if (req.params.period == 5){
            start = moment().subtract(3, 'months');
        } else if (req.params.period == 6){
            start = moment().subtract(4, 'months');
        } else if (req.params.period == 7) {
            start = moment().subtract(6, 'months');
        } else if (req.params.period == 8){
            start = moment().subtract(12, 'months');
        } else if (req.params.period == 9){
            start = moment().subtract(18, 'months');
        } else if (req.params.period == 10){
            start = moment().subtract(24, 'months');
        } else if (req.params.period == 11){
            start = moment().subtract(36, 'months');
        } else if (req.params.period == 12){
            start = moment().subtract(60, 'months');
        }
        console.log(start);

        var query = {
                Entry_Date: {
                    $gte: start,
                    $lte: now
                },
                User_ID: {
                    $eq: String(req.session.userId)
                }
              };

        Measurement_Status.find(query, function (error, data) {
          if (error) {
            return next(error);
          } else {
            console.log(data);
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true});
          }
        });
})


module.exports = progress_router;