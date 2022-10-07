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
  city: {
    type: String,
    require: true,
  },
  state: {
    type: String,
    require: true,
  },
  bioBlurb: {
    type: String,
    require: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Employer", EmployerSchema);
