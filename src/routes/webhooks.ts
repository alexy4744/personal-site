import bodyParser from "body-parser";
import { Router } from "express";

import github from "./webhooks/github";

const route: Router = Router();

route.use(bodyParser.json());

route.use("/github", github);

export default route;
