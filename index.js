async function getRepositories() {
  const projects = await superagent.get("https://api.github.com/users/alexy4744/repos").catch(error => ({ error }))
  if (projects.error) return Promise.reject(projects.error)
  return Promise.resolve(projects.body)
}

const forks = document.getElementById("forks");
const owner = document.getElementById("owner");

getRepositories()
  .then(projects => {
    for (const project of projects) {
      const div = document.createElement("div");
      const a = document.createElement("a");

      a.innerHTML = project.name
      a.href = project.html_url

      div.appendChild(a);

      if (project.fork) forks.appendChild(div)
      else owner.appendChild(div)
    }
  })
  .catch(error => console.error(error));
