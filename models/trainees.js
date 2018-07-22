var mongoose = require('mongoose');

var TraineesSchema = new mongoose.Schema({
  User_ID: {
    type: String,//should be object id
    required: true
  },
  Trainer_IDs: [String]
});

var Trainees = mongoose.model('Trainees', TraineesSchema);
module.exports = Trainees;