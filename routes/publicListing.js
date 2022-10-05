const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const listingController = require("../controllers/listings");

router.get(
  "/publicListing/:id",
  upload.single("file"),
  listingController.getPublicListing
);

module.exports = router;
