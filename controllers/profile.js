const cloudinary = require("../middleware/cloudinary");
const Listing = require("../models/Listing");
const Question = require("../models/Question");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const listings = await Listing.find({ user: req.user.id });
      res.render("profile.ejs", { listings: listings, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
};
