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

function get_daily_totals()
{
	day = time.date;
	
	var daily_totals = {
        Calories: 0,
        Protein: 0,
        Fat: 0,
        Carbs: 0,
        Fiber: 0
      }
	
	//query for all meals in day
	//query will be in meals model
		//for each
			/*daily_totals.Calories += meal.Calories;
			daily_totals.Protein +=	meal.Protein;
			daily_totals.Fat +=	meal.Fat;
			daily_totals.Carbs += meal.Fat;
			daily_totals.Fiber += meal.Fiber;
	res.send(daily_totals);*/
			
}

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
      req.body.grams &&
      req.body.protein &&
      req.body.fat &&
      req.body.carbs &&
      req.body.fiber) {

	      var foodData = {
	        Name: req.body.name,
	        Grams: req.body.grams,
	        Calories: req.body.calories,
	        Grams: req.body.grams,
	        Protein: req.body.calories,
	        Fat: req.body.grams,
	        Carbs: req.body.calories,
	        Fiber: req.body.grams
	      }

	      Food.create(foodData, function (error, food) {
	        if (error) {
	          return next(error);
	        } else {
	          return res.redirect('/profile');
	        }
	      });
	}
})

/*User.findAll({ email: email })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });*/



app.get('/test', function (req, res) {
  
  var MongoClient = require('mongodb').MongoClient
  const mongoose = require('mongoose');
 
  MongoClient.connect('mongodb://localhost:27017', function (err, client) {
    if (err) throw err

    var db = client.db('testdb');

    db.collection('test').find().toArray(function (err, result) {
      if (err) throw err

      console.log(result)
  	  res.send('Hello World! 2');
  	  client.close();
    })
  })

});





//ROUTES



//GETS

// get /meals
// meals for today
app.get('/meals', function (req, res) {

  var db_meals;
  
  var meals_json = [];
  /*for (var temp in db_meals)
  {
    	var meal = {"food" : temp.food, "amount" : temp.amount, "calories" : temp.calories, "protein" : temp.protein, "carbs" : temp.carbs, "fat" : temp.fat, "fiber" : temp.fiber};
    	meals_json.push(meal);
  }
  
  res.send(meals)*/

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


  //res.setHeader('Content-Type', 'application/json');
  //res.json({ a: 1, b: 2 });

  //res.send('get /meals')
})

// get /meals/day
// meals for specified day
app.get('/meals/day', function (req, res) {
  res.send('get /meals/day')
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