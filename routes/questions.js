const express = require("express");
const router = express.Router();
const questionsController = require("../controllers/questions");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Comment Routes - simplified for now
router.post("/createQuestion/:id", questionsController.createQuestion);

module.exports = router;
