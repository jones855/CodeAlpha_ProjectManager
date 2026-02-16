const router = require("express").Router();
const Project = require("../models/Project");

router.post("/", async (req, res) => {
  const project = await Project.create(req.body);
  res.json(project);
});

router.get("/", async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

module.exports = router;
