const express = require("express");
const router = express.Router(); // eslint-disable-line

router.get("/", (req, res) => res.render("index", {
  age: Math.floor((Date.now() - new Date("April 30, 2002 00:00:00")) * 3.17098e-11),
  repositories: req.app.settings.repositories
}));

module.exports = router;
