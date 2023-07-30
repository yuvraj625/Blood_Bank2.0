const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  Donorname: {
    type: String,
    required: true,
  },
  Donorage: {
    type: Number,
    required: true,
  },
  Donorblood:{
    type:String,
    required:true,
  },
  Donorcontact:{
    type:Number,
    required:true,
  }
});

const Donor = mongoose.model('Donor', userSchema);

module.exports = Donor;