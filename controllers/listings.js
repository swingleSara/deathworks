const cloudinary = require("../middleware/cloudinary");
const Listing = require("../models/Listing");
const Question = require("../models/Question");
const Employer = require("../models/Employer");
const Seeker = require("../models/Seeker");
const User = require("../models/User");

module.exports = {
  getFeed: async (req, res) => {
    try {
      const listings = await Listing.find().sort({ createdAt: "desc" }).lean();
      const employer = await Employer.findOne({ employer: req.body.user });
      const seeker = await Seeker.findOne({ seeker: req.body.user });
      res.render("feed.ejs", { 
        user: req.user,
        status: req.user.status,
        listings: listings,
        employer: employer,
        seeker: seeker
       });
    } catch (err) {
      res.redirect("/");
    }
  },
  getListing: async (req, res) => {
    try {
      const listing = await Listing.findById(req.params.id);
      const employer = await Employer.findOne({ employer: req.body.user });
      const seeker = await Seeker.findOne({ seeker: req.body.user });
      const user = await User.findById(req.user);
      const questions = await Question.find({ listing: req.params.id }).sort({ createdAt: "desc" }).lean();
      res.render("listing.ejs", {
        listing: listing,
        user: user,
        status: user.status,
        questions: questions,
        employer: employer,
        seeker: seeker,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getPublicListing: async (req, res) => {
    try {
      const listing = await Listing.findById(req.params.id);
      const employer = await Employer.findOne({ employer: req.body.user });
      const seeker = await Seeker.findOne({ seeker: req.body.user });
      const user = await User.findById(req.user);
      const questions = await Question.find({ listing: req.params.id }).sort({ createdAt: "desc" }).lean();
      res.render("publicListing.ejs", {
        listing: listing,
        user: user,
        status: req.user.status,
        questions: questions,
        employer: employer,
        seeker: seeker,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getCreateListing: (req, res) => {
    res.render("createListing.ejs");
  },
  createListing: async (req, res) => {
    try {
      // Upload image to cloudinary
      let result;
      if (req.file) {
        result = await cloudinary.uploader.upload(req.file.path);
      }
      if (!result) {
        await Listing.create({
          title: req.body.title,
          city: req.body.city,
          state: req.body.state,
          company: req.body.company,
          number: req.body.number,
          site: req.body.site,
          description: req.body.description,
          user: req.user.id,
        });
      } else {
        await Listing.create({
          title: req.body.title,
          image: result.secure_url,
          cloudinaryId: result.public_id,
          city: req.body.city,
          state: req.body.state,
          company: req.body.company,
          number: req.body.number,
          site: req.body.site,
          description: req.body.description,
          user: req.user.id,
        });
      }
      console.log("Listing has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  deleteListing: async (req, res) => {
    try {
      // Find listing by id
      let listing = await Listing.findById({ _id: req.params.id });
      // Delete image from cloudinary
      if (listing.cloudinaryId) {
        await cloudinary.uploader.destroy(listing.cloudinaryId);
      }
      // Delete listing from db
      await Listing.remove({ _id: req.params.id });
      console.log("Deleted listing");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
};
