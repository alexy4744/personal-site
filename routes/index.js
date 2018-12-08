const express = require("express");
const router = express.Router(); // eslint-disable-line

router.get("/", (req, res) => {
  res.render("index", { title: "Express" });
});

module.exports = router;
