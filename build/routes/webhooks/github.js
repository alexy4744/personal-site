"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const express_1 = require("express");
const add_1 = __importDefault(require("./github/add"));
const remove_1 = __importDefault(require("./github/remove"));
const route = express_1.Router();
const { GITHUB_SECRET } = process.env;
if (!GITHUB_SECRET)
    throw new Error("GITHUB_SECRET must be provided in the environment variables");
const ACTIONS_TO_ADD = ["created", "publicized", "unarchived"];
const ACTIONS_TO_REMOVE = ["archived", "deleted", "privatized"];
route.all("/", (req, res, next) => {
    const signature = req.get("x-hub-signature");
    if (!signature)
        return res.status(400).end();
    const payload = JSON.stringify(req.body);
    const digested = crypto_1.createHmac("sha1", GITHUB_SECRET).update(payload).digest("hex");
    const isGitHub = crypto_1.timingSafeEqual(Buffer.from(signature), Buffer.from(`sha1=${digested}`));
    if (!isGitHub)
        res.status(400).end();
    else
        next();
});
route.post("/", (req, res) => {
    const { action } = req.body;
    if (!action)
        return res.status(400).end();
    if (ACTIONS_TO_ADD.includes(action))
        add_1.default(req, res);
    else if (ACTIONS_TO_REMOVE.includes(action))
        remove_1.default(req, res);
    else
        res.status(200).end();
});
exports.default = route;
