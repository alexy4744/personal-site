/* eslint no-undef: 0 */

const projects = document.getElementById("projects");

(async () => {
  const repositories = await getRepositories().catch(error => ({ error }));

  if (repositories.error) {
    document.getElementById("loader").classList.add("hidden");
    return document.getElementById("fallback-projects").classList.remove("hidden");
  }

  for (const repository of repositories) {
    if (repository.archived || repository.fork || repository.private) continue; // Skip this repository if any of these are true

    const div = document.createElement("div");
    const a = document.createElement("a");
    const p = document.createElement("p");

    div.className = "repository";

    a.className = "repository-name";
    a.innerHTML = repository.name;
    a.href = repository.html_url;

    p.className = "description";
    p.innerHTML = repository.description;

    div.appendChild(a);
    div.appendChild(p);

    const languages = await getLanguages(repository.name).catch(error => ({ error }));

    if (languages.error || Object.keys(languages).length < 1) continue;

    const languagesDiv = document.createElement("div"); // Container to hold all the languages
    languagesDiv.className = "languages";

    for (let language in languages) {
      const lang = language;

      language = document.createElement("div"); // Container to hold all the text and color of the language
      language.className = "language";

      const langName = document.createElement("span");
      langName.className = "language-name";
      langName.innerHTML = lang;

      const langColor = document.createElement("div");
      langColor.className = `language-color ${lang.toLowerCase()}`;

      language.appendChild(langColor);
      language.appendChild(langName);

      languagesDiv.appendChild(language);
      div.appendChild(languagesDiv);
    }

    projects.appendChild(div);

    document.getElementById("loader").classList.add("hidden");
  }
})();

async function getRepositories() {
  const repositories = await superagent
    .get("httasdasps://api.github.com/users/alexy4744/repos")
    .set("Authorization", "token 9866031a87fa634f6d9a6d907b8d5912c92b50fb")
    .catch(error => ({ error }));
  if (repositories.error) return Promise.reject(repositories.error);
  return Promise.resolve(repositories.body);
}

async function getLanguages(repositoryName) {
  const languages = await superagent
    .get(`https://api.github.com/repos/alexy4744/${repositoryName}/languages`)
    .set("Authorization", "token 9866031a87fa634f6d9a6d907b8d5912c92b50fb")
    .catch(error => ({ error }));
  if (languages.error) return Promise.reject(languages.error);
  return Promise.resolve(languages.body);
}