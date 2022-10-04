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
router.get("/createListing", listingsController.getCreateListing);
router.get("/createEmployer", employerController.getCreateEmployer);
router.get("/createSeeker", seekerController.getCreateSeeker);
// router.get("/editEmployer", employerController.getEditEmployer);
// router.get("/editSeeker", seekerController.getEditSeeker);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;
