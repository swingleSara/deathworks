const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  location: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  number: {
    type: Array,
    required: true,
  },
  address: {
    type: Array,
    required: true,
  },
  site: {
    type: String,
    required: false,
  },
  description: {
    type: Array,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Listing", ListingSchema);
