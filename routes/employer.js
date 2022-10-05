const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const employerController = require("../controllers/employer");

router.post(
  "/createEmployer",
  upload.single("file"),
  employerController.createEmployer
);
router.put(
  "/editEmployer/:id",
  upload.single("file"),
  employerController.editEmployer
);

module.exports = router;
