var express = require('express');
var app = express();
var mongoose = require('mongoose');

app.set('json spaces', 3);
var bodyParser = require('body-parser');
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

var User = require('./models/user.js');
var Meal = require('./models/meal.js');
var Food = require('./models/food.js');
var Mac_Goal = require('./models/mac_goal.js');
var User_Stats = require('./models/user_stats.js');
var Measurement_Status = require('./models/measurement_status.js');

var session = require('express-session');
//use sessions for tracking logins
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false
}));

//connect to MongoDB
mongoose.connect('mongodb://localhost/testdb');

// include routes
var routes = require('./routes/router.js');
app.use('/', routes);

var meal_routes = require('./routes/meal_router.js');
app.use('/meal', meal_routes);

var food_routes = require('./routes/food_router.js');
app.use('/food', food_routes);

//var goal_routes = require('./routes/goal_router.js');
//app.use('/', goal_routes);*/


app.get('/create_account', function (req, res) {
  
  res.sendFile(__dirname + '/form2.html');
})

app.get('/log', function (req, res) {
  
  res.sendFile(__dirname + '/form3.html');
})

app.get('/', function (req, res) {
  
  res.sendFile(__dirname + '/formAng.html');
})


app.post('/create_mac_goal', function (req, res) {
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

//ROUTES



//GETS

// get /macros
// macros for today
app.get('/macros', function (req, res) {

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
			daily_totals["Protein"] = daily_totals["Protein"] +	parseInt(meals[i]["Protein"]);
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
app.get('/remaining_macros', function (req, res) {

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
		daily_totals["Protein"] = daily_totals["Protein"] +	parseInt(meals[i]["Protein"]);
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

// get/goals
// get goals search
app.get('/goals', function (req, res) {

  Mac_Goal.find({"User_ID": req.session.userId}, function(err, goals) {
    var goalsMap = {};

    goals.forEach(function(goal) {
      goalsMap[goal._id] = goal;
    });
	  res.setHeader('Content-Type', 'application/json');
  	res.json(goalsMap);
  })
})

// get /goals
// gets all goals
app.get('/goals', function (req, res) {
  res.send('get /goals')
})

app.get('/name', function (req, res) {
  
  res.sendFile(__dirname + '/form.html');
  //res.render('form.html');
})


// post /meal/day
// posts a single meal to the specified day
app.post('/meal/day', function (req, res) {
  res.send('post /meal/day')
})

// post /goal
// posts a goal
app.post('/goal', function (req, res) {
  res.send('post /goal')
})


//DELETES

// delete /meal/id
// deletes the specified meal for today
app.delete('/meal/id', function (req, res) {
  res.send('delete /meal/id')
})

// delete /meal/day/id
// deletes the specified meal for the specified day
app.delete('/meal/day/id', function (req, res) {
  res.send('delete /meal/day/id')
})

// delete /goal/id
// delete a goal
app.delete('/goal/id', function (req, res) {
  res.send('delete /goal/id')
})


//PUTS

// put /meal/id
// puts the specified meal for today
app.put('/meal/id', function (req, res) {
  res.send('put /meal/id')
})

// put /meal/day/id
// puts the specified meal for the specified day
app.put('/meal/day/id', function (req, res) {
  res.send('put /meal/day/id')
})

// put /goal/id
// puts a goal
app.put('/goal/id', function (req, res) {
  res.send('put /goal/id')
})



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});