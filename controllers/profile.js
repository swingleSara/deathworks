const Listing = require("../models/Listing");
const Employer = require("../models/Employer");
const Seeker = require("../models/Seeker");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const listings = await Listing.find({ user: req.user.id });
      const employer = await Employer.find({ user: req.user.id });
      const seeker = await Seeker.find({ user: req.user.id });
      res.render("profile.ejs", {
        listings: listings,
        user: req.user,
        status: req.user.status,
        employer: employer,
        seeker: seeker,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getPublicProfile: async (req, res) => {
    try {
      const employer = await Employer.findOne({ user: req.params.id });
      const seeker = await Seeker.findOne({ user: req.params.id });
      res.render("publicProfile.ejs", {
        employer: employer,
        seeker: seeker,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
