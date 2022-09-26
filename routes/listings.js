const express = require("express");
const router = express.Router();
const listingsController = require("../controllers/listings");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Listing Routes - simplified for now
router.get("/:id", ensureAuth, listingsController.getListing);

router.post("/createListing", listingsController.createListing);

router.delete("/deleteListing/:id", listingsController.deleteListing);

module.exports = router;
