const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const listingsController = require("../controllers/listings");
const profileController = require("../controllers/profile");
const employerController = require("../controllers/employer");
const seekerController = require("../controllers/seeker");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/", homeController.getIndex);
router.get("/profile", ensureAuth, profileController.getProfile);
router.get("/publicProfile/:id", profileController.getPublicProfile);
router.get("/feed", listingsController.getFeed);
router.get("/archivedFeed", ensureAuth, listingsController.getArchivedFeed);
router.get("/createListing", ensureAuth, listingsController.getCreateListing);
router.get("/publicListing/:id", listingsController.getPublicListing);
router.get("/createEmployer", ensureAuth, employerController.getCreateEmployer);
router.get("/createSeeker", ensureAuth, seekerController.getCreateSeeker);
router.get("/editEmployer", ensureAuth, employerController.getEditEmployer);
router.get("/editSeeker", ensureAuth, seekerController.getEditSeeker);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);
router.get("/contact", homeController.getContact);

module.exports = router;
