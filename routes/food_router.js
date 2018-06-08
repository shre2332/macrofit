var express = require('express');

var app = express()
var food_router = express.Router()

var User = require('../models/user.js');
var Meal = require('../models/meal.js');
var Food = require('../models/food.js');
var Mac_Goal = require('../models/mac_goal.js');
var User_Stats = require('../models/user_stats.js');
var Measurement_Status = require('../models/measurement_status.js');
var Exercise_Move = require('../models/exercise_move.js');
var Exercise_Move = require('../models/exercise_set.js');
var Exercise_Move = require('../models/exercise.js');

food_router.use(function (req, res, next) {
  console.log('food router')
  next()
})

food_router.post('/', function (req, res, next)  {
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




// get /food
// get one food
food_router.get('/:id', function (req, res, next)  {

  var id = req.params.id;

    Food.findById(id, function (err, food) {
  
      res.setHeader('Content-Type', 'application/json');
      res.json(food);
    })

})

// get /food/search_string
// get food search
food_router.get('/', function (req, res, next)  {
  console.log("in food click");

  Food.find({}, function(err, foods) {
    var foodMap = {};

    foods.forEach(function(food) {
      foodMap[food._id] = food;
    });
    res.setHeader('Content-Type', 'application/json');
    res.json(foodMap);
  })
})


// get food search
food_router.get('/search/:search_string', function (req, res, next)  {

    Food.find(
        { $text : { $search : String(req.params.search_string) } })
    .exec(function(err, results) {
        // callback
        console.log(results);

        var foodMap = {};

        results.forEach(function(food) {
          foodMap[food._id] = food;
        });
        res.setHeader('Content-Type', 'application/json');
        res.json(foodMap);
    });
})



// get /food/search_string
// get food search
/*food_router.get('/search_string', function (req, res, next) {
  res.send('get /food/search_string')
})*/


module.exports = food_router;