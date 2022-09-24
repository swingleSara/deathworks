const express = require("express");
const router = express.Router();
const questionsController = require("../controllers/questions");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Comment Routes - simplified for now
router.post("/createQuestion/:id", questionsController.createQuestion);

router.put("/addAnswer/:id/:listingId", questionsController.addAnswer);

module.exports = router;
