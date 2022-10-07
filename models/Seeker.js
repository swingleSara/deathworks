const mongoose = require("mongoose");

const SeekerSchema = new mongoose.Schema({
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
  city: {
    type: String,
    require: true,
  },
  state: {
    type: String,
    require: true,
  },
  quals: {
    type: String,
    require: false,
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

module.exports = mongoose.model("Seeker", SeekerSchema);
