import {Chalk, red, yellow, cyan, magenta} from 'chalk';

export enum LogLevel {
  ERROR,
  WARN,
  INFO,
  SILLY,
}

export const MAX_LENGTH = Object.keys(LogLevel).reduce((output, value) => {
  return Math.max(output, value.length);
}, 0) + 3;

export const LEVEL_CHALK: {
    [key in LogLevel]: Chalk;
} = {
    [LogLevel.ERROR]: red,
    [LogLevel.WARN]: yellow,
    [LogLevel.INFO]: cyan,
    [LogLevel.SILLY]: magenta,
};

export class Logger {
  static #level: LogLevel = LogLevel.INFO;

  public static setLevel(level?: LogLevel): void {
    if (!level) return;

    Logger.#level = level;
  }

  public static log(level: LogLevel, ...message: string[]) {
    if (Logger.#level < level) return;

    const chalk = LEVEL_CHALK[level];

    console.log(chalk(`${`[${LogLevel[level].toLowerCase()}]:`.padEnd(MAX_LENGTH, ' ')} ${message.join(' ')}`));
  }

  public static error(...message: string[]) {
    Logger.log(LogLevel.ERROR, ...message);
  }

  public static warn(...message: string[]) {
    Logger.log(LogLevel.WARN, ...message);
  }

  public static info(...message: string[]) {
    Logger.log(LogLevel.INFO, ...message);
  }

  public static silly(...message: string[]) {
    Logger.log(LogLevel.SILLY, ...message);
  }
}
