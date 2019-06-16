"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const GitHubRepository_1 = __importDefault(require("../../../entity/GitHubRepository"));
const prettyConsole_1 = __importDefault(require("../../../utils/prettyConsole"));
exports.default = (req, res) => {
    const { id } = req.body.repository;
    if (!id)
        return res.status(400).end();
    typeorm_1.getConnection()
        .createQueryBuilder()
        .delete()
        .from(GitHubRepository_1.default)
        .where("id = :id", { id })
        .execute()
        .then(() => res.status(200).end())
        .catch((error) => {
        prettyConsole_1.default.error(error);
        res.status(500).send({
            error: error.message
        });
    });
};
