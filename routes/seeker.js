const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const seekerController = require("../controllers/seeker");

router.post(
  "/createseeker",
  upload.single("file"),
  seekerController.createSeeker
);

module.exports = router;