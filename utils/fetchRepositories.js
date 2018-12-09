const fetchLanguages = require("./fetchLanguages");
const superagent = require("superagent");

module.exports = async () => {
  const repositories = await superagent
    .get(`https://api.github.com/user/repos`)
    .set("Authorization", `token ${process.env.ACCESS_TOKEN}`)
    .then(res => res.body.filter(r => !r.fork && !r.archived && !r.private && r.language))
    .catch(error => ({ error }));
  if (repositories.error) return [];

  for (const repository of repositories) {
    repository.languages = await fetchLanguages(repository.name);
  }

  return repositories;
};