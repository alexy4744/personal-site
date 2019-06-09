import { Request, Response } from "express";
import { getConnection } from "typeorm";

import GitHubRepository from "../../../entity/GitHubRepository";

import prettyConsole from "../../../utils/prettyConsole";

export default (req: Request, res: Response): void => {
  const { id } = req.body.repository;
  if (!id) return res.status(400).end();

  getConnection()
    .createQueryBuilder()
    .delete()
    .from(GitHubRepository)
    .where("id = :id", { id })
    .execute()
    .then((): void => res.status(200).end())
    .catch((error: Error): void => {
      prettyConsole.error(error);

      res.status(500).send({
        error: error.message
      });
    });
};
