const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        listing: req.params.id,
      });
      console.log("Comment has been added!");
      res.redirect("/listing/" + req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
};
