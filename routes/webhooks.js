const express = require("express");
const router = express.Router(); // eslint-disable-line

router.post("/github", (req, res) => {
  console.log(req.body)
});

module.exports = router;