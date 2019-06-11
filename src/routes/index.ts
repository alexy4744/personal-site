import { Request, Response, Router } from "express";
import { getRepository } from "typeorm";

import GitHubRepository from "../entity/GitHubRepository";
import prettyConsole from "../utils/prettyConsole";

const { BIRTHDAY } = process.env;
if (!BIRTHDAY) throw new Error("BIRTHDAY must be provided in environment variables!");

const birthday: number = new Date(BIRTHDAY).getTime();
const route: Router = Router();

route.get("/", (_: Request, res: Response): void => {
  getRepository(GitHubRepository)
    .createQueryBuilder("repository")
    .where("repository.archived = :archived", { archived: false })
    .andWhere("repository.disabled = :disabled", { disabled: false })
    .andWhere("repository.fork = :fork", { fork: false })
    .andWhere("repository.private = :private", { private: false })
    .getMany()
    .then((repositories: GitHubRepository[]): void => {
      res.render("index", {
        age: ((Date.now() - birthday) * 3.17098e-11).toFixed(7),
        birthday,
        repositories
      });
    })
    .catch((error: Error): void => {
      prettyConsole.error(error);
      res.status(500).end();
    });
});

export default route;
