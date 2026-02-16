const router = require("express").Router();
const User = require("../models/User");

router.post("/login", async (req, res) => {
  const user = await User.findOne(req.body);
  if (!user) return res.status(401).json("Invalid login");
  res.json(user);
});

module.exports = router;
