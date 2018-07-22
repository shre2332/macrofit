var mongoose = require('mongoose');

var PlayerSchema = new mongoose.Schema({
  User_ID: {
    type: String,//should be object id
    required: true
  },
  Coach_IDs: [String]
});

var Player = mongoose.model('Player', PlayerSchema);
module.exports = Player;