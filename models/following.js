var mongoose = require('mongoose');

var FollowingSchema = new mongoose.Schema({
  User_ID: {
    type: String,//should be object id
    required: true
  },
  Following_IDs: [String]
});

var Following = mongoose.model('Following', FollowingSchema);
module.exports = Following;