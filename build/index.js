"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
require("reflect-metadata");
const node_fetch_1 = __importDefault(require("node-fetch"));
const typeorm_1 = require("typeorm");
const app_1 = __importDefault(require("./app"));
const GitHubRepository_1 = __importDefault(require("./entity/GitHubRepository"));
const prettyConsole_1 = __importDefault(require("./utils/prettyConsole"));
const PORT = Number(process.env.PORT) || 8080;
(async () => {
    try {
        const connection = await typeorm_1.createConnection();
        await connection
            .createQueryBuilder()
            .delete()
            .from(GitHubRepository_1.default)
            .execute();
        prettyConsole_1.default.log("Fetching repositories...");
        const response = await node_fetch_1.default("https://api.github.com/users/alexy4744/repos");
        if (!response.ok)
            throw new Error(response.statusText);
        const repositories = await response.json();
        await connection
            .createQueryBuilder()
            .insert()
            .into(GitHubRepository_1.default)
            .values(repositories.map((repository) => ({
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
        })))
            .execute();
        prettyConsole_1.default.log("Succesfully fetched repositories!");
    }
    catch (error) {
        prettyConsole_1.default.fatal(error);
    }
    app_1.default.listen(PORT, () => prettyConsole_1.default.success(`Server started on port ${PORT}!`));
})();
