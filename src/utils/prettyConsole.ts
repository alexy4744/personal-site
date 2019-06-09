/* eslint-disable @typescript-eslint/no-explicit-any */

import chalk from "chalk";
import util from "util";

const inspect = (data: any): string => (typeof data === "object"
  ? util.inspect(data, { colors: true, depth: null })
  : data);

const timestamp = (): string => {
  const currentDate: Date = new Date(Date.now());
  return `[${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}]`;
};

const prettyConsole = {
  log: (data: any): void => console.log(chalk.cyan(`${timestamp()} ${inspect(data)}`)),
  info: (data: any): void => console.info(chalk.magenta(`${timestamp()} ${inspect(data)}`)),
  success: (data: any): void => console.log(chalk.green(`${timestamp()} ${inspect(data)}`)),
  warn: (data: any): void => console.warn(chalk.yellow(`${timestamp()} ${inspect(data)}`)),
  error: (data: any): void => console.error(chalk.red(`${timestamp()} ${inspect(data)}`)),
  fatal(data: any): never {
    prettyConsole.error(data);
    return process.exit(1);
  }
};

export default prettyConsole;
