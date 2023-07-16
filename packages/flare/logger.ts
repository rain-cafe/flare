import {Chalk, red, yellow, cyan, magenta} from 'chalk';

export enum LogLevel {
    ERROR,
    WARN,
    INFO,
    SILLY,
}

const MAX_LENGTH = Object.keys(LogLevel).reduce((output, value) => {
    return Math.max(output, value.length);
}, 0) + 3;

const LEVEL_CHALK: {
    [key in LogLevel]: Chalk;
} = {
    [LogLevel.ERROR]: red,
    [LogLevel.WARN]: yellow,
    [LogLevel.INFO]: cyan,
    [LogLevel.SILLY]: magenta,
};

export class Logger {
    public static log(level: LogLevel, ...message: string[]) {
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