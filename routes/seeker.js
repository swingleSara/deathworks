const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const seekerController = require("../controllers/seeker");

router.post(
  "/createSeeker",
  upload.single("file"),
  seekerController.createSeeker
);
router.put(
  "/editSeeker/:id",
  upload.single("file"),
  seekerController.editSeeker
);

module.exports = router;
