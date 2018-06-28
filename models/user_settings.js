var mongoose = require('mongoose');

var User_Settings_Schema = new mongoose.Schema({
  User_ID: {
    type: String,//should be object id
    required: true,
    trim: true
  },
  Macro_Goal_Type: {
    type: Number
  }
});

var User_Settings = mongoose.model('User_Settings', User_Settings_Schema);
module.exports = User_Settings;
