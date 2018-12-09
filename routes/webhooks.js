const fetchLanguages = require("../utils/fetchLanguages");
const express = require("express");
const router = express.Router(); // eslint-disable-line

router.post("/github", async req => {
  const { action, repository } = req.body;

  if (!action || !repository) return;
  if (repository.private || repository.fork || repository.archived || !repository.language) return;

  if (action === "created") {
    repository.languages = await fetchLanguages(repository.name);
    req.app.settings.repositories = [...req.app.settings.repositories, repository];
  }

  if (action === "deleted") {
    const repositories = req.app.settings.repositories.filter(p => p.id !== repository.id);
    return req.app.settings.repositories = repositories;
  }
});

module.exports = router;