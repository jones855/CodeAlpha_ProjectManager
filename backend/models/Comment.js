const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  text: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  task: { type: mongoose.Schema.Types.ObjectId, ref: "Task" }
});

module.exports = mongoose.model("Comment", CommentSchema);
