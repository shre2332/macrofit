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

module.exports = account_router;