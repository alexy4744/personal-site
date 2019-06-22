"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const GitHubRepository_1 = __importDefault(require("../../../entity/GitHubRepository"));
const prettyConsole_1 = __importDefault(require("../../../utils/prettyConsole"));
exports.default = (req, res) => {
    const { repository } = req.body;
    if (!repository)
        return res.status(400).end();
    typeorm_1.getConnection()
        .createQueryBuilder()
        .insert()
        .into(GitHubRepository_1.default)
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
        .then(() => res.status(200).end())
        .catch((error) => {
        prettyConsole_1.default.error(error);
        res.status(500).send({
            error: error.message
        });
    });
};
