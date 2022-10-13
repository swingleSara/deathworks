const cloudinary = require("../middleware/cloudinary");
const Listing = require("../models/Listing");
const Employer = require("../models/Employer");
const Seeker = require("../models/Seeker");

module.exports = {
  getCreateEmployer: async (req, res) => {
    try {
      const listings = await Listing.find().sort({ createdAt: "desc" }).lean();
      const employer = await Employer.findOne({ user: req.user.id });
      const seeker = await Seeker.findOne({ user: req.user.id });
      res.render("createEmployer.ejs", { 
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
  createEmployer: async (req, res) => {
    try {
      // Upload image to cloudinary
      let result;
      if (req.file) {
        result = await cloudinary.uploader.upload(req.file.path);
      }
      if (!result) {
        await Employer.create({
          name: req.body.name,
          companyName: req.body.companyName,
          city: req.body.city,
          state: req.body.state,
          bioBlurb: req.body.bioBlurb,
          user: req.user.id,
        });
      } else {
        await Employer.create({
          name: req.body.name,
          image: result.secure_url,
          cloudinaryId: result.public_id,
          companyName: req.body.companyName,
          city: req.body.city,
          state: req.body.state,
          bioBlurb: req.body.bioBlurb,
          user: req.user.id,
        });
      }
      console.log("Employer profile has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  getEditEmployer: async (req, res) => {
    try {
      const listings = await Listing.find().sort({ createdAt: "desc" }).lean();
      const employer = await Employer.findOne({ user: req.user.id });
      const seeker = await Seeker.findOne({ user: req.user.id });
      res.render("editEmployer.ejs", { 
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
  editEmployer: async (req, res) => {
    try {
      let result;
      if (req.file) {
        result = await cloudinary.uploader.upload(req.file.path);
      }
      if (!result) {
        await Employer.findOneAndUpdate(
          { _id: req.params.id },
          {
            $set: {
              name: req.body.name,
              companyName: req.body.companyName,
              city: req.body.city,
              state: req.body.state,
              bioBlurb: req.body.bioBlurb,
            },
          }
        );
      } else {
        await Employer.findOneAndUpdate(
          { _id: req.params.id },
          {
            $set: {
              name: req.body.name,
              image: result.secure_url,
              cloudinaryId: result.public_id,
              companyName: req.body.companyName,
              city: req.body.city,
              state: req.body.state,
              bioBlurb: req.body.bioBlurb,
            },
          }
        );
      }
      console.log("Employer profile has been udpated!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
};
