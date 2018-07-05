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
var Exercise_Move = require('./models/exercise_move.js');
var Exercise_Set = require('./models/exercise_set.js');
var Exercise = require('./models/exercise.js');

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

var goal_routes = require('./routes/goal_router.js');
app.use('/goal', goal_routes);

var macro_routes = require('./routes/macro_router.js');
app.use('/macro', macro_routes);

var progress_routes = require('./routes/progress_router.js');
app.use('/progress', progress_routes);

var exercise_router = require('./routes/exercise_router.js');
app.use('/exercise', exercise_router);

var workout_router = require('./routes/workout_router.js');
app.use('/workout', workout_router);

app.get('/create_account', function (req, res) {
  
  res.sendFile(__dirname + '/form2.html');
})

app.get('/log', function (req, res) {
  
  res.sendFile(__dirname + '/form3.html');
})

app.get('/', function (req, res) {
  
  res.sendFile(__dirname + '/formAng.html');
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