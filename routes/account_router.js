var express = require('express');

var app = express()
var account_router = express.Router()

var User = require('../models/user.js');
var Meal = require('../models/meal.js');
var Food = require('../models/food.js');
var Mac_Goal = require('../models/mac_goal.js');
var User_Stats = require('../models/user_stats.js');
var Measurement_Status = require('../models/measurement_status.js');
var Exercise_Move = require('../models/exercise_move.js');
var Exercise_Set = require('../models/exercise_set.js');
var Exercise = require('../models/exercise.js');

account_router.use(function (req, res, next) {
  console.log('account router')
  next()
})

account_router.get('/', function (req, res, next) {

  User.find({"_id": req.session.userId}, function(err, account) {
    console.log(account);
    res.setHeader('Content-Type', 'application/json');
    res.json(account);
  })

})

account_router.get('/stats', function (req, res, next) {

  User_Stats.find({"User_ID": req.session.userId}, function(err, account) {
    if (err) {
      res.setHeader('Content-Type', 'application/json');
      res.json({success: false});
      //return next(error);
    } else {
      console.log(account);
      res.setHeader('Content-Type', 'application/json');
      res.json(account);
    }
  })

})

account_router.post('/stats', function (req, res, next) {

  var statsData = req.body;
  statsData.User_ID= String(req.session.userId);

  User_Stats.create(statsData, function (error, stats) {
          if (error) {
            return next(error);
          } else {
            res.setHeader('Content-Type', 'application/json');
          res.json({success: true});
          }
        });

})

account_router.put('/stats', function (req, res, next) {

  var statsData = req.body;
  statsData.User_ID= String(req.session.userId);

  User_Stats.update({User_ID: req.session.userId}, statsData, function(err, raw) {
    if (err) {
      res.send(err);
    }
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true});
  });

})

account_router.get('/publicity_type', function (req, res, next) {

  User.find({"_id": req.session.userId}, function(err, user) {
    if (err) {
      res.setHeader('Content-Type', 'application/json');
      res.json({success: false});
      //return next(error);
    } else {
      console.log(user);
      res.setHeader('Content-Type', 'application/json');
      res.json(user);
    }
  })

})

account_router.put('/publicity_type', function (req, res, next) {

  var pubData = req.body;
  //statsData.User_ID= String(req.session.userId);

  User.update({_id: req.session.userId}, pubData, function(err, raw) {
    if (err) {
      res.send(err);
    }
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true});
  });

})

module.exports = account_router;