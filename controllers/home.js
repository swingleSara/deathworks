const express = require("express");
const router = express.Router();
const listingsController = require("../controllers/listings");
const Listing = require("../models/Listing");
const User = require("../models/User");

router.get("/", listingsController.getFeed);

module.exports = {
  getIndex: async (req, res) => {
    try {
      const listings = await Listing.find({
        user: req.user.id,
        archive: { $ne: true },
      })
        .sort({ createdAt: "desc" })
        .lean();
      const user = await User.findById(req.user);
      res.render("index.ejs", { listings: listings, user: user });
    } catch (err) {
      console.log(err);
    }
  },
  getContact: (req, res) => {
    res.render("contact.ejs");
  },
};
