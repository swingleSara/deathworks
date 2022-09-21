const Question = require("../models/Question");

module.exports = {
  createQuestion: async (req, res) => {
    try {
      await Question.create({
        question: req.body.question,
        likes: 0,
        listing: req.params.id,
      });
      console.log("Question has been asked!");
      res.redirect("/listing/" + req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
  addAnswer: async (req, res) => {
    try {
      await Question.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: { answer: req.body.answer },
        }
      );
      console.log("Question answered!");
      res.redirect(`/listing/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
};
