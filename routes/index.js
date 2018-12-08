const express = require("express");
const router = express.Router(); // eslint-disable-line

router.get("/", (req, res) => {
  res.render("index", { projects: req.app.settings.projects });
});

module.exports = router;
