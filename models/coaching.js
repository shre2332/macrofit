var mongoose = require('mongoose');

var CoachingSchema = new mongoose.Schema({
  User_ID: {
    type: String,//should be object id
    required: true
  },
  Player_IDs: [String]
});

var Coaching = mongoose.model('Coaching', CoachingSchema);
module.exports = Coaching;