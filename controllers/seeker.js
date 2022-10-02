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
          location: req.body.location,
          quals: req.body.quals,
          bioBlurb: req.body.bioBlurb,
          user: req.user.id,
        });
      } else {
        await Seeker.create({
          name: req.body.name,
          image: result.secure_url,
          cloudinaryId: result.public_id,
          location: req.body.location,
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
};
