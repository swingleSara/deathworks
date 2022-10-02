const cloudinary = require("../middleware/cloudinary");
const Employer = require("../models/Employer");

module.exports = {
  getCreateEmployer: (req, res) => {
    res.render("createEmployer.ejs");
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
          location: req.body.location,
          number: req.body.number,
          bioBlurb: req.body.bioBlurb,
          user: req.user.id,
        });
      } else {
        await Employer.create({
          name: req.body.name,
          image: result.secure_url,
          cloudinaryId: result.public_id,
          companyName: req.body.companyName,
          location: req.body.location,
          number: req.body.number,
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
};
