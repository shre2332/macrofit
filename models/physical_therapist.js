var mongoose = require('mongoose');

var PhysicalTherapistSchema = new mongoose.Schema({
  User_ID: {
    type: String,//should be object id
    required: true
  },
  Patient_IDs: [String]
});

var Physical_Therapist = mongoose.model('Physical_Therapist', PhysicalTherapistSchema);
module.exports = Physical_Therapist;