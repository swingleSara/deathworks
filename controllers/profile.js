const Listing = require("../models/Listing");
const Question = require("../models/Question");
const Employer = require("../models/Employer");
const Seeker = require("../models/Seeker");
const User = require("../models/User");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const listings = await Listing.find({
        user: req.user.id,
        archive: { $ne: true },
      })
        .sort({ createdAt: "desc" })
        .lean();
      const questions = await Question.find({ user: req.user.id })
        .sort({ createdAt: "desc" })
        .lean();
      const employer = await Employer.findOne({ user: req.user.id });
      const seeker = await Seeker.findOne({ user: req.user.id });
      const allListings = await Listing.find()
        .sort({ createdAt: "desc" })
        .lean();
      const allQuestions = await Question.find()
        .sort({ createdAt: "desc" })
        .lean();
      res.render("profile.ejs", {
        listings: listings,
        questions: questions,
        user: req.user,
        status: req.user.status,
        employer: employer,
        seeker: seeker,
        allListings: allListings,
        allQuestions: allQuestions,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getPublicProfile: async (req, res) => {
    try {
      const listings = await Listing.find({
        user: req.user.id,
        archive: { $ne: true },
      })
        .sort({ createdAt: "desc" })
        .lean();
      const employer = await Employer.findOne({ user: req.params.id });
      const seeker = await Seeker.findOne({ user: req.params.id });
      const user = await User.findById(req.user);
      const questions = await Question.find({ user: req.params.id })
        .sort({ createdAt: "desc" })
        .lean();
      const allListings = await Listing.find()
        .sort({ createdAt: "desc" })
        .lean();

      res.render("publicProfile.ejs", {
        listings: listings,
        user: user,
        status: req.user ? req.user.status : undefined,
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
