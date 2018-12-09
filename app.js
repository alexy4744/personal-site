const dotenv = require("dotenv");
const fs = require("fs").promises;
const http = require("http");
const https = require("https");
const path = require("path");

const express = require("express");

const bodyParser = require("body-parser");
const helmet = require("helmet");
const verifySignature = require("./middlewares/verifySignature");

const index = require("./routes/index");
const webhooks = require("./routes/webhooks");

const fetchRepositories = require("./utils/fetchRepositories");

const app = express();

dotenv.config({ path: path.join(__dirname, "./process.env") });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "assets")));
app.use(helmet());
app.use(bodyParser.json());

app.use("/", index);

app.use(verifySignature); // Middleware to verify signatures to make sure it is GitHub posting to this endpoint
app.use("/webhooks", webhooks);

(async () => {
  app.settings.repositories = await fetchRepositories();

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
