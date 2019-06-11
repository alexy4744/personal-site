/* eslint-disable import/first */

require("dotenv").config();

import "reflect-metadata";

import fetch, { Response } from "node-fetch";
import { createConnection, Connection } from "typeorm";

import app from "./app";
import GitHubRepository from "./entity/GitHubRepository";
import prettyConsole from "./utils/prettyConsole";

const PORT: number = Number(process.env.PORT) || 8080;

(async (): Promise<void | never> => {
  try {
    const connection: Connection = await createConnection();

    await connection
      .createQueryBuilder()
      .delete()
      .from(GitHubRepository)
      .execute();

    prettyConsole.log("Fetching repositories...");

    const response: Response = await fetch("https://api.github.com/users/alexy4744/repos");
    if (!response.ok) throw new Error(response.statusText);

    const repositories: GitHubRepository[] = await response.json();

    await connection
      .createQueryBuilder()
      .insert()
      .into(GitHubRepository)
      .values(
        repositories.map(
          (repository: GitHubRepository): GitHubRepository => (
            {
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
            }
          )
        )
      )
      .execute();

    prettyConsole.log("Succesfully fetched repositories!");
  } catch (error) {
    prettyConsole.fatal(error);
  }

  app.listen(PORT, (): void => prettyConsole.success(`Server started on port ${PORT}!`));
})();
