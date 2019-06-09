/* eslint-disable import/first */

require("dotenv").config();

import "reflect-metadata";

import bodyParser from "body-parser";
import express, { Application } from "express";
import path from "path";
import { createConnection } from "typeorm";

import index from "./routes/index";
import webhooks from "./routes/webhooks";

import prettyConsole from "./utils/prettyConsole";

const PORT: number = Number(process.env.PORT) || 8080;
const app: Application = express();

createConnection()
  .then((): void => {
    app.set("views", path.join(__dirname, "views"));
    app.set("view engine", "ejs");

    app.use(express.static(path.join(__dirname, "../public")));

    app.use(bodyParser.json());

    app.use(index);
    app.use("/webhooks", webhooks);

    app.listen(PORT, (): void => prettyConsole.success(`Listening on port ${PORT}`));
  })
  .catch(prettyConsole.fatal);
