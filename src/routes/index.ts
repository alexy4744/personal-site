import { Request, Response, Router } from "express";
import { getRepository } from "typeorm";

import GitHubRepository from "../entity/GitHubRepository";
import prettyConsole from "../utils/prettyConsole";

const { BIRTHDAY } = process.env;
if (!BIRTHDAY) throw new Error("BIRTHDAY must be provided in environment variables!");

const route: Router = Router();

route.get("/", (_: Request, res: Response): void => {
  getRepository(GitHubRepository)
    .createQueryBuilder("repositories")
    .getMany()
    .then((repositories: GitHubRepository[]): void => {
      res.render("index", {
        age: ((Date.now() - new Date(BIRTHDAY).getTime()) * 3.17098e-11).toFixed(2),
        repositories
      });
    })
    .catch((error: Error): void => {
      prettyConsole.error(error);
      res.status(500).end();
    });
});

export default route;
