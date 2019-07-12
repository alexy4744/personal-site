"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const typeorm_1 = require("typeorm");
const GitHubRepository_1 = __importDefault(require("../entity/GitHubRepository"));
const prettyConsole_1 = __importDefault(require("../utils/prettyConsole"));
const { BIRTHDAY } = process.env;
if (!BIRTHDAY)
    throw new Error("BIRTHDAY must be provided in environment variables!");
const birthday = new Date(BIRTHDAY).getTime();
const route = express_1.Router();
route.get("/", (_, res) => {
    typeorm_1.getRepository(GitHubRepository_1.default)
        .createQueryBuilder("repository")
        .where("repository.archived = :archived", { archived: false })
        .andWhere("repository.disabled = :disabled", { disabled: false })
        .andWhere("repository.fork = :fork", { fork: false })
        .andWhere("repository.private = :private", { private: false })
        .getMany()
        .then((repositories) => {
        res.render("index", {
            age: Math.floor((Date.now() - birthday) * 3.17098e-11),
            birthday,
            repositories
        });
    })
        .catch((error) => {
        prettyConsole_1.default.error(error);
        res.status(500).end();
    });
});
exports.default = route;
