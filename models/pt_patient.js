var mongoose = require('mongoose');

var PTPatientSchema = new mongoose.Schema({
  User_ID: {
    type: String,//should be object id
    required: true
  },
  PT_Patient_IDs: [String]
});

var PT_Patient = mongoose.model('PT_Patient', PTPatientSchema);
module.exports = PT_Patient;