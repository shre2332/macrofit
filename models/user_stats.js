var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var User_Stats_Schema = new mongoose.Schema({
  User_ID: {
    type: String,//should be object id
    required: true,
    trim: true
  },
  Height: {
    type: Number,
  },
  Weight: {
    type: Number,
  },
  Age: {
    type: Number,
  },
  Body_Fat_Percentage: {
    type: Number,
  },
  Gender: {
    type: Number,
  }
});

var User_Stats = mongoose.model('User_Stats', User_Stats_Schema);
module.exports = User_Stats;
