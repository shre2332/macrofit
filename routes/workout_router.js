var express = require('express');

var app = express()
var workout_router = express.Router()

var User = require('../models/user.js');
var Meal = require('../models/meal.js');
var Food = require('../models/food.js');
var Mac_Goal = require('../models/mac_goal.js');
var User_Stats = require('../models/user_stats.js');
var Measurement_Status = require('../models/measurement_status.js');
var Exercise_Move = require('../models/exercise_move.js');
var Exercise_Set = require('../models/exercise_set.js');
var Exercise = require('../models/exercise.js');
var Workout_Set = require('../models/workout_set.js');
var Workout_Plan = require('../models/workout_plan.js');

workout_router.use(function (req, res, next) {
  console.log('workout router')
  next()
})


workout_router.post('/set', function (req, res, next)  {
  if (req.body.Name,
      req.body.Exercises_IDs,
      req.body.Actual_Rest_Set_Length) {
    
        /*var workoutSetData = {
          Name: req.body.Name,
          Exercises_IDs: req.body.Exercises_IDs,
          Actual_Rest_Set_Length: req.body.Actual_Rest_Set_Length,
          User_ID: String(req.session.userId)
        }*/
        
        var workoutSetData = req.body;
        workoutSetData.User_ID = String(req.session.userId);

        Workout_Set.create(workoutSetData, function (error, set) {
          if (error) {
            return next(error);
          } else {
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true});
          }
        });
  }
})

workout_router.post('/move', function (req, res, next)  {
  if (req.body.Name,
      req.body.Pectorals,
      req.body.Latimus_Dorsi,
      req.body.Bicep,
      req.body.Tricep,
      req.body.Mid_Deltiod,
      req.body.Front_Deltoid,
      req.body.Rear_Deltoid,
      req.body.Forarms,
      req.body.Abdominals,
      req.body.Rhomboids,
      req.body.Lower_Back,
      req.body.Upper_Trapizius,
      req.body.Mid_Trapizius,
      req.body.Lower_Trapizius,
      req.body.Obliques,
      req.body.Quadriceps,
      req.body.Hamstrings,
      req.body.Glute_Max,
      req.body.Glute_Min,
      req.body.Calves,
      req.body.Cardio) {

        /*var exerciseMoveData = {
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
        }*/
        
        var exerciseMoveData = req.body;
        exerciseMoveData.Custom_Creator_ID = String(req.session.userId);
        
        Exercise_Move.create(exerciseMoveData, function (error, move) {
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
workout_router.get('/move', function (req, res, next)  {

  Exercise_Move.find({}, function(err, moves) {
    var exerciseMoveMap = {};

    moves.forEach(function(exercise_move) {
      exerciseMoveMap[exercise_move._id] = exercise_move;
    });
    res.setHeader('Content-Type', 'application/json');
    res.json(exerciseMoveMap);
  })
})


// get food search
workout_router.get('/move/search/:search_string', function (req, res, next)  {

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

workout_router.post('/set', function (req, res, next)  {
  if (req.body.Exercise_Move_ID,
      req.body.Reps,
      req.body.Sets,
      req.body.Rest,
      req.body.Pace) {

        /*var exerciseSetData = {
          Name: "temp",
          Exercise_Move_ID: req.body.exercise_move_id,
          Reps: req.body.reps,
          Sets: req.body.sets,
          Rest: req.body.rest,
          Pace: req.body.pace,
          Custom_Flag: true,
          Custom_Creator_ID: String(req.session.userId)
        }*/
        
        var exerciseSetData = req.body;
        exerciseSetData.Custom_Creator_ID = String(req.session.userId);
        exerciseSetData.Name = "temp";
        
        Exercise_Set.create(exerciseSetData, function (error, set) {
          if (error) {
            return next(error);
          } else {
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true});
          }
        });
  }
})

workout_router.get('/set', function (req, res, next)  {
  Workout_Set.find({}, function(err, sets) {
    var workoutSetMap = {};

    sets.forEach(function(workout_set) {
      workoutSetMap[workout_set._id] = workout_set;
    });
    res.setHeader('Content-Type', 'application/json');
    res.json(workoutSetMap);
  })
})

// get exercise_set search
workout_router.get('/set/search/:search_string', function (req, res, next)  {

    Workout_Set.find(
        { $text : { $search : String(req.params.search_string) } })
    .exec(function(err, results) {
        // callback
        console.log(results);

        var workoutSetMap = {};

        results.forEach(function(set) {
          workoutSetMap[set._id] = set;
        });
        res.setHeader('Content-Type', 'application/json');
        res.json(workoutSetMap);
    });
})

workout_router.get('/set/:id', function (req, res, next)  {

    Workout_Set.findOne({ _id: String(req.params.id)  })
    .exec(function (err, set) {
      if (err) {
        return callback(err)
      } else if (!set) {
        var err = new Error('set not found.');
        err.status = 401;
        return callback(err);
      }
            res.setHeader('Content-Type', 'application/json');
            res.json(set);

    });
})

// get exercise_set search
workout_router.get('/plan/search/:search_string', function (req, res, next)  {

    Workout_Plan.find(
        { $text : { $search : String(req.params.search_string) } })
    .exec(function(err, results) {
        // callback
        console.log(results);

        var workoutPlanMap = {};

        results.forEach(function(plan) {
          workoutPlanMap[plan._id] = plan;
        });
        res.setHeader('Content-Type', 'application/json');
        res.json(workoutPlanMap);
    });
})


module.exports = workout_router;