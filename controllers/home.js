const express = require("express");
const router = express.Router();
const listingsController = require("../controllers/listings");
const Listing = require("../models/Listing");

router.get("/", listingsController.getFeed);

module.exports = {
  getIndex: async (req, res) => {
    try {
      const listings = await Listing.find().sort({ createdAt: "desc" }).lean();
      res.render("index.ejs", { listings: listings });
    } catch (err) {
      console.log(err);
    }
  },
};
