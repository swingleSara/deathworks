const Listing = require("../models/Listing");
const Question = require("../models/Question");
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
      const listings = await Listing.find({ user: req.params.id }).sort({ createdAt: "desc" }).lean();
      const questions = await Question.find({ user: req.params.id }).sort({ createdAt: "desc"}).lean();
      const employer = await Employer.findOne({ user: req.params.id });
      const seeker = await Seeker.findOne({ user: req.params.id });
      const allListings = await Listing.find().sort({createdAt: "desc"}).lean();

      res.render("publicProfile.ejs", {
        user: req.user,
        status: req.user.status,
        listings: listings,
        questions: questions,
        employer: employer,
        seeker: seeker,
        allListings: allListings,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
