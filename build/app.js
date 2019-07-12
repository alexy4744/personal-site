"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const index_1 = __importDefault(require("./routes/index"));
const webhooks_1 = __importDefault(require("./routes/webhooks"));
const app = express_1.default();
app.set("views", path_1.default.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("view options", { rmWhitespace: true });
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
app.use(index_1.default);
app.use("/webhooks", webhooks_1.default);
exports.default = app;
