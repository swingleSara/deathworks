const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const profileController = require("../controllers/profile");

router.get(
  "/publicProfile",
  upload.single("file"),
  profileController.getPublicProfile
);

module.exports = router;
