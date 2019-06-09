import { Request, Response } from "express";
import { getConnection } from "typeorm";

import GitHubRepository from "../../../entity/GitHubRepository";

import prettyConsole from "../../../utils/prettyConsole";

export default (req: Request, res: Response): void => {
  const { repository } = req.body;
  if (!repository) return res.status(400).end();

  getConnection()
    .createQueryBuilder()
    .insert()
    .into(GitHubRepository)
    .values({
      archived: repository.archived,
      created_at: repository.created_at,
      disabled: repository.disabled,
      description: repository.description,
      fork: repository.fork,
      forks_count: repository.forks_count,
      html_url: repository.html_url,
      id: repository.id,
      language: repository.language,
      name: repository.name,
      private: repository.private,
      pushed_at: repository.pushed_at,
      stargazers_count: repository.stargazers_count,
      updated_at: repository.updated_at,
      watchers_count: repository.watchers_count
    })
    .execute()
    .then((): void => res.status(200).end())
    .catch((error: Error): void => {
      prettyConsole.error(error);

      res.status(500).send({
        error: error.message
      });
    });
};
