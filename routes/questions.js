const express = require("express");
const router = express.Router();
const questionsController = require("../controllers/questions");

router.post("/createQuestion/:id", questionsController.createQuestion);
router.put("/addAnswer/:id/:listingId", questionsController.addAnswer);

module.exports = router;
