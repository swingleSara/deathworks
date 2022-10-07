const cloudinary = require("../middleware/cloudinary");
const Seeker = require("../models/Seeker");

module.exports = {
  getCreateSeeker: (req, res) => {
    res.render("createSeeker.ejs");
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
          quals: req.body.quals,
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
          quals: req.body.quals,
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
    const seeker = await Seeker.findOne({ user: req.user });
    res.render("editSeeker.ejs", { seeker: seeker });
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
              quals: req.body.quals,
              bioBlurb: req.body.bioBlurb,
              user: req.user.id,
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
              quals: req.body.quals,
              bioBlurb: req.body.bioBlurb,
              user: req.user.id,
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
