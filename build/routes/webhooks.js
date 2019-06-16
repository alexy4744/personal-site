"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = require("express");
const github_1 = __importDefault(require("./webhooks/github"));
const route = express_1.Router();
route.use(body_parser_1.default.json());
route.use("/github", github_1.default);
exports.default = route;
