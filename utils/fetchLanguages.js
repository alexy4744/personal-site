const superagent = require("superagent");

module.exports = async repositoryName => {
  const languages = await superagent
    .get(`https://api.github.com/repos/${process.env.GITHUB_USERNAME}/${repositoryName}/languages`)
    .set("Authorization", `token ${process.env.ACCESS_TOKEN}`)
    .catch(error => ({ error }));
  if (languages.error) return [];
  return languages.body;
};