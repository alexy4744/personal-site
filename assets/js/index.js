/* eslint no-undef: 0 */

const colors = {
  "red": {
    "red-dark": "#cc1f1a",
    "red": "#e3342f",
    "red-light": "#ef5753"
  },
  "orange": {
    "orange-dark": "#de751f",
    "orange": "#f6993f",
    "orange-light": "#faad63"
  },
  "green": {
    "green-dark": "#1f9d55",
    "green": "#38c172",
    "green-light": "#51d88a"
  },
  "teal": {
    "teal-dark": "#38a89d",
    "teal": "#4dc0b5",
    "teal-light": "#64d5ca"
  },
  "blue": {
    "blue-dark": "#2779bd",
    "blue": "#3490dc",
    "blue-light": "#6cb2eb"
  },
  "indigo": {
    "indigo-dark": "#5661b3",
    "indigo": "#6574cd",
    "indigo-light": "#7886d7"
  },
  "purple": {
    "purple-dark": "#794acf",
    "purple": "#9561e2",
    "purple-light": "#a779e9"
  },
  "pink": {
    "pink-dark": "#eb5286",
    "pink": "#f66d9b",
    "pink-light": "#fa7ea8"
  }
};

document.addEventListener("DOMContentLoaded", initialize.bind(this));

function initialize() {
  particlesJS("particles-js", particlesConfig()); // Load particles
  calculateAge(); // Replace age in about me
  hoverableLogos(); // Make logos change colors on hover
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

// Function to avoid hoisting the variable in the top of the file
function particlesConfig() {
  return {
    "particles": {
      "number": {
        "value": 80,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": false,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 20,
        "direction": "top-left",
        "random": true,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "repulse"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  };
}
