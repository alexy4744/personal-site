/* eslint no-undef: 0 */

document.addEventListener("DOMContentLoaded", initialize.bind(this));

function initialize() {
  particlesJS("particles-js", particlesConfig); // Load particles
  calculateAge(); // Replace age in about me
  hoverableLogos(); // Make logos change colors on hover
  renderRepositories(); // Fetch repositories from GitHub API
}

function calculateAge() {
  const born = new Date("April 30, 2002 00:00:00");
  const age = Math.floor((Date.now() - born) * 3.17098e-11); // Find the difference between the current date with my birthday and convert to years

  document.getElementById("about-me").innerHTML = document.getElementById("about-me").innerHTML.replace("${age}", age);
}

function hoverableLogos() {
  const logos = document.getElementsByClassName("logo");

  for (const logo of logos) {
    logo.setAttribute("onmouseenter", "colorizeLogo(this)");
    logo.setAttribute("onmouseleave", "muteLogo(this)");
  }
}

function colorizeLogo(logo) { // eslint-disable-line
  const parts = document.getElementsByClassName(logo.attributes.logo.value); // Get any other parts of the logo
  for (const part of parts) part.setAttribute("style", `fill: ${part.attributes.color.value} !important;`); // Set each part to their designated colors specified in the attribute
}

function muteLogo(logo) { // eslint-disable-line
  const parts = document.getElementsByClassName(logo.attributes.logo.value); // Get any other parts of the logo
  for (const part of parts) part.setAttribute("style", `fill: ${part.attributes.mute.value} !important`); // Revert the colors back to specified values
}

function changePrimary() { // eslint-disable-line
  const html = document.getElementsByTagName("html")[0];
  const chosenPalette = Object.keys(colors)[Math.floor(Math.random() * Object.keys(colors).length)];

  for (const color in colors[chosenPalette]) {
    const shade = color.split("-")[1];
    if (!checkPalette(shade, colors[chosenPalette][color])) return changePrimary(); // Make sure the chosen palette is not the current one that is already applied by calling itself again if false.
    if (shade) html.style.setProperty(`--primary-${shade}`, colors[chosenPalette][color]);
    else html.style.setProperty("--primary", colors[chosenPalette][color]);
  }

  function checkPalette(shade, color) {
    const value = getComputedStyle(document.body).getPropertyValue(`--primary${`-${shade}` || ""}`);
    if (value === color) return false;
    return true;
  }
}

async function renderRepositories() {
  const projects = document.getElementById("projects");
  const repositories = await getRepositories().catch(error => ({ error }));

  if (repositories.error) {
    console.log("Fetching repositories from GitHub API has failed.\nUsing fallback projects NOW!\nError below...");
    console.error(repositories.error);

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
}

async function getRepositories() {
  const repositories = await superagent
    .get("httaps://api.github.com/users/alexy4744/repos")
    .catch(error => ({ error }));
  if (repositories.error) return Promise.reject(repositories.error);
  return Promise.resolve(repositories.body);
}

async function getLanguages(repositoryName) {
  const languages = await superagent
    .get(`https://api.github.com/repos/alexy4744/${repositoryName}/languages`)
    .catch(error => ({ error }));
  if (languages.error) return Promise.reject(languages.error);
  return Promise.resolve(languages.body);
}