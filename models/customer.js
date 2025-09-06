const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  contact: {
    type: String,
  },
  measurements: {
    chest: { type: Number },
    waist: { type: Number },
    hips: { type: Number },
    shoulder: { type: Number },
    sleeve: { type: Number },
    inseam: { type: Number },
    neck: { type: Number }
  },
  remarks :{
    type : String,
  }
}, { 
  timestamps: { createdAt: "createdAt", updatedAt: "lastUpdated" } 
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
