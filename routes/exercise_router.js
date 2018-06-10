var express = require('express');

var app = express()
var exercise_router = express.Router()

var User = require('../models/user.js');
var Meal = require('../models/meal.js');
var Food = require('../models/food.js');
var Mac_Goal = require('../models/mac_goal.js');
var User_Stats = require('../models/user_stats.js');
var Measurement_Status = require('../models/measurement_status.js');
var Exercise_Move = require('../models/exercise_move.js');
var Exercise_Set = require('../models/exercise_set.js');
var Exercise = require('../models/exercise.js');

exercise_router.use(function (req, res, next) {
  console.log('exercise router')
  next()
})

exercise_router.post('/', function (req, res, next)  {
  if (req.body.name &&
      req.body.grams &&
      req.body.calories &&
      req.body.fat &&
      req.body.carbs &&
      req.body.protein &&
      req.body.fiber) {

        var foodData = {
          Name: req.body.name,
          Grams: req.body.grams,
          Calories: req.body.calories,
          Fat: req.body.fat,
          Carbs: req.body.carbs,
          Protein: req.body.protein,
          Fiber: req.body.fiber
        }

        Food.create(foodData, function (error, food) {
          if (error) {
            return next(error);
          } else {
            res.setHeader('Content-Type', 'application/json');
          res.json({success: true});
          }
        });
  }
})

exercise_router.post('/set', function (req, res, next)  {
  if (req.body.name &&
      req.body.grams &&
      req.body.calories &&
      req.body.fat &&
      req.body.carbs &&
      req.body.protein &&
      req.body.fiber) {

        var foodData = {
          Name: req.body.name,
          Grams: req.body.grams,
          Calories: req.body.calories,
          Fat: req.body.fat,
          Carbs: req.body.carbs,
          Protein: req.body.protein,
          Fiber: req.body.fiber
        }

        Food.create(foodData, function (error, food) {
          if (error) {
            return next(error);
          } else {
            res.setHeader('Content-Type', 'application/json');
          res.json({success: true});
          }
        });
  }
})

exercise_router.post('/move', function (req, res, next)  {
  if (req.body.name) {

        var exerciseMoveData = {
          Name: req.body.name,
          Pectorals: req.body.pecs,
          Latimus_Dorsi: req.body.lats,
          Bicep: req.body.bis,
          Tricep: req.body.tris,
          Mid_Deltiod: req.body.mdelt,
          Front_Deltoid: req.body.fdelt,
          Rear_Deltoid: req.body.rdelt,
          Forarms: req.body.forearms,
          Abdominals: req.body.abs,
          Rhomboids: req.body.rhomboids,
          Lower_Back: req.body.lback,
          Upper_Trapizius: req.body.utrap,
          Mid_Trapizius: req.body.mtrap,
          Lower_Trapizius: req.body.ltraps,
          Obliques: req.body.obs,
          Quadriceps: req.body.quads,
          Hamstrings: req.body.hams,
          Glute_Max: req.body.glutemax,
          Glute_Min: req.body.glutemin,
          Calves: req.body.calves,
          Cardio: req.body.cardio,
          Custom_Creator_ID: String(req.session.userId)
        }

        Exercise_Move.create(exerciseMoveData, function (error, food) {
          if (error) {
            return next(error);
          } else {
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true});
          }
        });
  }
})

// get food search
exercise_router.get('/move', function (req, res, next)  {

  Exercise_Move.find({}, function(err, foods) {
    var exerciseMoveMap = {};

    Exercise_Move.forEach(function(execise_move) {
      exerciseMoveMap[execise_move._id] = execise_move;
    });
    res.setHeader('Content-Type', 'application/json');
    res.json(exerciseMoveMap);
  })
})


// get food search
exercise_router.get('/move/search/:search_string', function (req, res, next)  {

    Exercise_Move.find(
        { $text : { $search : String(req.params.search_string) } })
    .exec(function(err, results) {
        // callback
        console.log(results);

        var exerciseMoveMap = {};

        results.forEach(function(execise_move) {
          exerciseMoveMap[execise_move._id] = execise_move;
        });
        res.setHeader('Content-Type', 'application/json');
        res.json(exerciseMoveMap);
    });
})


module.exports = exercise_router;