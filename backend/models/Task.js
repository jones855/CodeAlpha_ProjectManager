const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: String,
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }]
});

module.exports = mongoose.model("Task", TaskSchema);
