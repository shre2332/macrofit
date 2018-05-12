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

app.post('/someUrl', function (req, res) {
	//res.send('Hello World! 2');
	res.setHeader('Content-Type', 'application/json');
  	res.json({ok: "okay"});
})

app.get('/create_account', function (req, res) {
  
  res.sendFile(__dirname + '/form2.html');
})

app.get('/log', function (req, res) {
  
  res.sendFile(__dirname + '/form3.html');
})

app.get('/', function (req, res) {
  
  res.sendFile(__dirname + '/formAng.html');
})


app.post('/create_food', function (req, res) {
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


//ROUTES



//GETS

// get /meals
// meals for today
app.get('/macros', function (req, res) {

	var day = new Date();
	
	var daily_totals = {
        Calories: 0,
        Protein: 0,
        Fat: 0,
        Carbs: 0,
        Fiber: 0
      }
	
	//Meal.find({"User_ID": req.session.userId, "Entry_Date": {"$gte": new Date(day.getYear(), day.getMonth(), day.getDate()), "$lt": new Date(day.getYear(), day.getMonth(), day.getDate()+1)}}, function(err, meals) {
	Meal.find({"User_ID": req.session.userId}, function(err, meals) {
	  if (err) return handleError(err);
	  	//console.log(meals);
	    var arrayLength = meals.length;
		for (var i = 0; i < arrayLength; i++) {
	      	//console.log(meals[i]["Calories"]);
			daily_totals["Calories"] = daily_totals["Calories"] + parseInt(meals[i]["Calories"]);
			daily_totals["Protein"] = daily_totals["Protein"] +	parseInt(meals[i]["Protein"]);
			daily_totals["Fat"] = daily_totals["Fat"] + parseInt(meals[i]["Fat"]);
			daily_totals["Carbs"] = daily_totals["Carbs"] + parseInt(meals[i]["Carbs"]);
			daily_totals["Fiber"] = daily_totals["Fiber"] + parseInt(meals[i]["Fiber"]);
		}

		console.log("done");
		//return daily_totals;

		console.log(daily_totals);
		res.setHeader('Content-Type', 'application/json');
  		res.json(daily_totals);
	});
})

// get /meals
// meals for today
app.get('/meals', function (req, res) {

  var db_meals;
  
  var meals_json = [];

  var MongoClient = require('mongodb').MongoClient
 
  MongoClient.connect('mongodb://localhost:27017', function (err, client) {
    if (err) throw err

    var db = client.db('testdb');

    db.collection('test').find().toArray(function (err, result) {
      if (err) throw err

      console.log(result)
  	  res.setHeader('Content-Type', 'application/json');
  	  res.json(result);
  	  //res.send('Hello World! 2');
  	  client.close();
    })
  })

})

// get /meals/day
// meals for specified day
app.get('/meals/day', function (req, res) {
  res.send('get /meals/day')
})

// get /food/search_string
// get food search
app.get('/food', function (req, res) {

  Food.find({}, function(err, foods) {
    var foodMap = {};

    foods.forEach(function(food) {
      foodMap[food._id] = food;
    });
	res.setHeader('Content-Type', 'application/json');
  	res.json(foodMap);
  })
})

// get /food/search_string
// get food search
app.get('/food/search_string', function (req, res) {
  res.send('get /food/search_string')
})

// get /food/id
// get food by id
app.get('/food/id', function (req, res) {
  res.send('get /food/id')
})

// get /goals
// gets all goals
app.get('/goals', function (req, res) {
  res.send('get /goals')
})


//POSTS

app.post('/add_meal', function (req, res) {
  if (req.body.food_id &&
      req.body.grams) {

  		var mealData = {};

  		Food.findById(req.body.food_id)
		.exec(function (error, food) {
		      if (error) {
		        return next(error);
		      } else {
		        if (food === null) {
		          var err = new Error('Not found');
		          err.status = 400;
		          return next(err);
		        } else {
		          //foodMap = food;
		          mealData = {
	        	  	Food_ID: String(req.body.food_id),
	        	  	User_ID: String(req.session.userId),
		          	Grams: req.body.grams,
		          	Calories: parseInt(food["Calories"]),
		          	Protein: parseInt(food["Protein"]),
		          	Fat: parseInt(food["Fat"]),
		          	Carbs: parseInt(food["Carbs"]),
		          	Fiber: parseInt(food["Fiber"])
	      		  }

	      		  Meal.create(mealData, function (error, meal) {
			        if (error) {
			          return next(error);
			        } else {
			          res.setHeader('Content-Type', 'application/json');
		  			  res.json({success: true});
			        }
			      });

		        }
		      }
		    });
     
	}
})

app.get('/name', function (req, res) {
  
  res.sendFile(__dirname + '/form.html');
  //res.render('form.html');
})

// post /meal
// posts a single meal to current day
//app.post('/meal', function (req, res) {
app.post('/meal_post', function (req, res) {

  var name_in = req.body.name;
  
  var MongoClient = require('mongodb').MongoClient
 
  MongoClient.connect('mongodb://localhost:27017', function (err, client) {
    if (err) throw err

    var db = client.db('testdb');

    var myobj = { name: name_in };

    db.collection('test').insertOne(myobj, function(err, res) {
      if (err) throw err
      console.log(name_in);
      client.close();
    })
  })
  res.send('post /meal')
})

// post /meal/day
// posts a single meal to the specified day
app.post('/meal/day', function (req, res) {
  res.send('post /meal/day')
})

// post /food
// posts a new food item
app.post('/food', function (req, res) {
  res.send('post /food')
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