const mongoose = require("mongoose");

const SeekerSchema = new mongoose.Schema({
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
  email: {
    type: String,
    require: true,
  },
  location: {
    type: Array,
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

module.exports = mongoose.model("Seeker", SeekerSchema);
