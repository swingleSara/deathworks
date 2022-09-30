const Listing = require("../models/Listing");

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
