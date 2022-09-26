const Question = require("../models/Question");

module.exports = {
  createQuestion: async (req, res) => {
    try {
      await Question.create({
        question: req.body.question,
        listing: req.params.id,
      });
      console.log("Question has been asked!");
      res.redirect(`/listing/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  addAnswer: async (req, res) => {
    try {
      await Question.findOneAndUpdate(
        { _id: req.params.id, listing: req.params.listingId },
        {
          $set: { answer: req.body.answer },
        }
      );
      console.log("Question answered!");
      res.redirect(`/listing/${req.params.listingId}`);
    } catch (err) {
      console.log(err);
    }
  },
};
