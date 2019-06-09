import { createHmac, timingSafeEqual } from "crypto";
import {
  NextFunction, Request, Response, Router
} from "express";

import add from "./github/add";
import remove from "./github/remove";

const route: Router = Router();

const { GITHUB_SECRET } = process.env;
if (!GITHUB_SECRET) throw new Error("GITHUB_SECRET must be provided in the environment variables");

const ACTIONS_TO_ADD: string[] = ["created", "publicized", "unarchived"];
const ACTIONS_TO_REMOVE: string[] = ["archived", "deleted", "privatized"];

// Make sure that the request is coming from GitHub by validating with our webhook secret
route.all("/", (req: Request, res: Response, next: NextFunction): void => {
  const signature: string = req.get("x-hub-signature");
  if (!signature) return res.status(400).end();

  const payload: string = JSON.stringify(req.body);
  const digested: string = createHmac("sha1", GITHUB_SECRET).update(payload).digest("hex");
  const isGitHub: boolean = timingSafeEqual(Buffer.from(signature), Buffer.from(`sha1=${digested}`));

  if (!isGitHub) res.status(400).end();
  else next();
});

route.post("/", (req: Request, res: Response): void => {
  const { action } = req.body;
  if (!action) return res.status(400).end();

  if (ACTIONS_TO_ADD.includes(action)) add(req, res);
  else if (ACTIONS_TO_REMOVE.includes(action)) remove(req, res);
  else res.status(200).end();
});

export default route;
