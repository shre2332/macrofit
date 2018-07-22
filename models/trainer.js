var mongoose = require('mongoose');

var TrainerSchema = new mongoose.Schema({
  User_ID: {
    type: String,//should be object id
    required: true
  },
  Trainee_IDs: [String]
});

var Trainer = mongoose.model('Trainer', TrainerSchema);
module.exports = Trainer;