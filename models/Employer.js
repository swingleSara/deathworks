const mongoose = require("mongoose");

const EmployerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    require: false,
  },
  cloudinaryId: {
    type: String,
    require: false,
  },
  companyName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  location: {
    type: Array,
    require: false,
  },
  number: {
    type: String,
    require: false,
  },
  quals: {
    type: String,
    require: false,
  },
  bioBlurb: {
    type: String,
    require: false,
  },
});

module.exports = mongoose.model("Employer", EmployerSchema);
