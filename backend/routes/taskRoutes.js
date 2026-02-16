const router = require("express").Router();
const Task = require("../models/Task");
const Comment = require("../models/Comment");

router.post("/", async (req, res) => {
  const task = await Task.create(req.body);
  req.app.get("io").emit("taskCreated");
  res.json(task);
});

router.get("/", async (req, res) => {
  const tasks = await Task.find({ project: req.query.project })
    .populate("assignedTo")
    .populate({
      path: "comments",
      populate: { path: "user" }
    });

  res.json(tasks);
});

router.post("/:id/comment", async (req, res) => {
  const comment = await Comment.create(req.body);

  const task = await Task.findById(req.params.id);
  task.comments.push(comment._id);
  await task.save();

  req.app.get("io").emit("commentAdded");

  res.json(comment);
});

module.exports = router;
