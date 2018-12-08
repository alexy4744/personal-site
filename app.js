const fs = require("fs-nextra");
const path = require("path");
const http = require("http");
const https = require("https");

const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const express = require("express");

const index = require("./routes/index");
const webhooks = require("./routes/webhooks");

dotenv.config({ path: path.join(__dirname, "./process.env") });

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("projects", []); // Global object to hold cached projects

app.use(express.static(path.join(__dirname, "assets")));
app.use(bodyParser.json());

app.use("/", index);
app.use("/webhooks", webhooks);

// catch 404
// app.use((req, res) => res.render("error"));

(async () => {
  const options = {
    certificates: {
      key: await fs.readFile("./certs/cert.key").catch(() => null),
      cert: await fs.readFile("./certs/cert.pem").catch(() => null)
    },
    ports: {
      http: process.env.HTTP || 80,
      https: process.env.HTTPS || 443
    }
  };

  http
    .createServer(app)
    .listen(options.ports.http, () => console.log(`Server started on port ${options.ports.http} (HTTP)`));

  if (options.certificates.key && options.certificates.cert) {
    https
      .createServer({ ...options.certificates }, app)
      .listen(options.ports.https, () => console.log(`Server started on port ${options.ports.https} (HTTPS)`));
  }
})();

process.on("uncaughtException", (...args) => console.error(...args));
process.on("unhandledRejection", (...args) => console.error(...args));
