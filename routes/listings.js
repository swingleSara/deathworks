const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const listingsController = require("../controllers/listings");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/:id", ensureAuth, listingsController.getListing);
router.get("/publicListing/:id", listingsController.getPublicListing);
router.post(
  "/createListing",
  upload.single("file"),
  listingsController.createListing
);
router.delete("/deleteListing/:id", listingsController.deleteListing);
router.put(
  "/archiveListing/:id",
  upload.single("file"),
  listingsController.archiveListing
);

module.exports = router;
