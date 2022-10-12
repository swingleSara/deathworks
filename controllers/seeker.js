const cloudinary = require("../middleware/cloudinary");
const Seeker = require("../models/Seeker");
const Employer = require("../models/Employer");
const Listing = require("../models/Listing");

module.exports = {
  getCreateSeeker: async (req, res) => {
    try {
      const listings = await Listing.find().sort({ createdAt: "desc" }).lean();
      const employer = await Employer.find({ user: req.user.id });
      const seeker = await Seeker.find({ user: req.user.id });
      res.render("createSeeker.ejs", { 
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
  createSeeker: async (req, res) => {
    try {
      // Upload image to cloudinary
      let result;
      if (req.file) {
        result = await cloudinary.uploader.upload(req.file.path);
      }
      if (!result) {
        await Seeker.create({
          name: req.body.name,
          city: req.body.city,
          state: req.body.state,
          bioBlurb: req.body.bioBlurb,
          user: req.user.id,
        });
      } else {
        await Seeker.create({
          name: req.body.name,
          image: result.secure_url,
          cloudinaryId: result.public_id,
          city: req.body.city,
          state: req.body.state,
          bioBlurb: req.body.bioBlurb,
          user: req.user.id,
        });
      }
      console.log("Seeker profile has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  getEditSeeker: async (req, res) => {
    try {
      const listings = await Listing.find().sort({ createdAt: "desc" }).lean();
      const employer = await Employer.find({ user: req.user.id });
      const seeker = await Seeker.find({ user: req.user.id });
      res.render("editSeeker.ejs", { 
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
  editSeeker: async (req, res) => {
    try {
      let result;
      if (req.file) {
        result = await cloudinary.uploader.upload(req.file.path);
      }
      if (!result) {
        await Seeker.findOneAndUpdate(
          { _id: req.params.id },
          {
            $set: {
              name: req.body.name,
              city: req.body.city,
              state: req.body.state,
              bioBlurb: req.body.bioBlurb,
            },
          }
        );
      } else {
        await Seeker.findOneAndUpdate(
          { _id: req.params.id },
          {
            $set: {
              name: req.body.name,
              image: result.secure_url,
              cloudinaryId: result.public_id,
              city: req.body.city,
              state: req.body.state,
              bioBlurb: req.body.bioBlurb,
            },
          }
        );
      }
      console.log("Seeker profile has been updated!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
};
