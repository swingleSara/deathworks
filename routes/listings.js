const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const listingsController = require("../controllers/listings");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Listing Routes - simplified for now
router.get("/:id", ensureAuth, listingsController.getListing);

router.post(
  "/createListing",
  upload.single("file"),
  listingsController.createListing
);

router.put("/likeListing/:id", listingsController.likeListing);

router.delete("/deleteListing/:id", listingsController.deleteListing);

module.exports = router;
