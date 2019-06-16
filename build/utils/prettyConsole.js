"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const util_1 = __importDefault(require("util"));
const inspect = (data) => (typeof data === "object"
    ? util_1.default.inspect(data, { colors: true, depth: null })
    : data);
const timestamp = () => {
    const currentDate = new Date(Date.now());
    return `[${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}]`;
};
const prettyConsole = {
    log: (data) => console.log(chalk_1.default.cyan(`${timestamp()} ${inspect(data)}`)),
    info: (data) => console.info(chalk_1.default.magenta(`${timestamp()} ${inspect(data)}`)),
    success: (data) => console.log(chalk_1.default.green(`${timestamp()} ${inspect(data)}`)),
    warn: (data) => console.warn(chalk_1.default.yellow(`${timestamp()} ${inspect(data)}`)),
    error: (data) => console.error(chalk_1.default.red(`${timestamp()} ${inspect(data)}`)),
    fatal(data) {
        prettyConsole.error(data);
        return process.exit(1);
    }
};
exports.default = prettyConsole;
