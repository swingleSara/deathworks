const mongoose = require("mongoose");

const EmployerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
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
  location: {
    type: Array,
    require: false,
  },
  number: {
    type: String,
    require: false,
  },
  bioBlurb: {
    type: String,
    require: false,
  },
});

module.exports = mongoose.model("Employer", EmployerSchema);
