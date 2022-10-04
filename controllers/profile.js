const Employer = require("../models/Employer");
const Listing = require("../models/Listing");
const Seeker = require("../models/Seeker");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const listings = await Listing.find({ user: req.user.id });
      res.render("profile.ejs", { listings: listings, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getPublicProfile: async (req, res) => {
    try {
      const employer = await Employer.find({ user: req.user.id });
      const seeker = await Seeker.find({ user: req.user.id });
      res.render("publicProfile.ejs", {
        user: req.user,
        employer: employer,
        seeker: seeker,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
