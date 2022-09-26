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
  getFeed: async (req, res) => {
    try {
      const listings = await Listing.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { listings: listings });
    } catch (err) {
      console.log(err);
    }
  },
  getListing: async (req, res) => {
    try {
      const listing = await Listing.findById(req.params.id);
      const questions = await Question.find({ listing: req.params.id })
        .sort({ createdAt: "desc" })
        .lean();
      res.render("listing.ejs", {
        listing: listing,
        user: req.user,
        questions: questions,
      });
    } catch (err) {
      console.log(err);
    }
  },
  createListing: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Listing.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        location: req.body.location,
        company: req.body.company,
        number: req.body.number,
        address: req.body.address,
        site: req.body.site,
        description: req.body.description,
        user: req.user.id,
      });
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
      await cloudinary.uploader.destroy(listing.cloudinaryId);
      // Delete listing from db
      await Listing.remove({ _id: req.params.id });
      console.log("Deleted listing");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
