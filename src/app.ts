import express, { Application } from "express";
import path from "path";

import index from "./routes/index";
import webhooks from "./routes/webhooks";

const app: Application = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("view options", { rmWhitespace: true });

app.use(express.static(path.join(__dirname, "../public")));

app.use(index);
app.use("/webhooks", webhooks);

export default app;
