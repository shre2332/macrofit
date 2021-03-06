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
  if (req.body.Exercise_Move_ID &&
      req.body.Sets) {

        var exerciseData = req.body;
        exerciseData.User_ID= String(req.session.userId);

        var i;
        for (i = 0; i < req.body.Sets; i++) {
            exerciseData.Reps[i] = req.body.Reps;
            exerciseData.Weight[i] = req.body.Weight;
            exerciseData.Pace[i] = req.body.Pace;
            exerciseData.Rest[i] = req.body.Rest;
        }

        exercise.create(exerciseData, function (error, exercise) {
          if (error) {
            return next(error);
          } else {
            res.setHeader('Content-Type', 'application/json');
          res.json({success: true});
          }
        });
  }
})

exercise_router.get('/today', function (req, res, next) {

  var day = new Date();

  Exercise.find({"User_ID": req.session.userId, "Entry_Date": {$gte: new Date(day.getFullYear(),day.getMonth(),day.getDate())}}, function(err, exercise) {
    var exerciseMap = {};

    exercise.forEach(function(exercise) {
      exerciseMap[exercise._id] = exercise;
    });

  res.setHeader('Content-Type', 'application/json');
    res.json(exerciseMap);
  })

})

exercise_router.post('/set', function (req, res, next)  {
  if (req.body.Exercise_Move_ID) {

    Exercise_Move.findOne({ _id: req.body.Exercise_Move_ID })
    .exec(function (err, move) {
      if (err) {
        return callback(err)
      } else if (!move) {
        var err = new Error('move not found.');
        err.status = 401;
        return callback(err);
      }
    
        /*var exerciseSetData = {
          Name: move["Name"],
          Exercise_Move_ID: req.body.exercise_move,
          Reps: req.body.reps,
          Sets: req.body.sets,
          Rest: req.body.rest,
          Pace: req.body.pace,
          Custom_Flag: true,
          Custom_Creator_ID: String(req.session.userId)
        }*/
        
        var exerciseSetData = req.body;
        exerciseSetData.Name= move["Name"];
        exerciseSetData.Custom_Flag= true;
        exerciseSetData.Custom_Creator_ID= String(req.session.userId);

        Exercise_Set.create(exerciseSetData, function (error, set) {
          if (error) {
            return next(error);
          } else {
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true});
          }
        });

    });
  }
})

exercise_router.post('/move', function (req, res, next)  {
  if (req.body.Name &&
      req.body.Pectorals &&
      req.body.Latimus_Dorsi &&
      req.body.Bicep &&
      req.body.Tricep &&
      req.body.Mid_Deltiod &&
      req.body.Front_Deltoid &&
      req.body.Rear_Deltoid &&
      req.body.Forarms &&
      req.body.Abdominals &&
      req.body.Rhomboids &&
      req.body.Lower_Back &&
      req.body.Upper_Trapizius &&
      req.body.Mid_Trapizius &&
      req.body.Lower_Trapizius &&
      req.body.Obliques &&
      req.body.Quadriceps &&
      req.body.Hamstrings &&
      req.body.Glute_Max &&
      req.body.Glute_Min &&
      req.body.Calves &&
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
exercise_router.get('/move', function (req, res, next)  {

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

exercise_router.get('/set', function (req, res, next)  {
  Exercise_Set.find({}, function(err, sets) {
    var exerciseSetMap = {};

    sets.forEach(function(exercise_set) {
      exerciseSetMap[exercise_set._id] = exercise_set;
    });
    res.setHeader('Content-Type', 'application/json');
    res.json(exerciseSetMap);
  })
})

exercise_router.get('/set/:id', function (req, res, next)  {

    Exercise_Set.findOne({ _id: String(req.params.id)  })
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
exercise_router.get('/set/search/:search_string', function (req, res, next)  {

    Exercise_Set.find(
        { $text : { $search : String(req.params.search_string) } })
    .exec(function(err, results) {
        // callback
        console.log(results);

        var exerciseSetMap = {};

        results.forEach(function(set) {
          exerciseSetMap[set._id] = set;
        });
        res.setHeader('Content-Type', 'application/json');
        res.json(exerciseSetMap);
    });
})


module.exports = exercise_router;