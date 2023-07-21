import { LogLevel } from '@flarie/core/logger';
import chalk from 'chalk';
import { config } from 'dotenv';

export function get<T = string>(defaultValue: T | null, ...names: string[]): T {
    for (const name of names) {
        const value = process.env[name];

        if (!value) continue;

        return value as unknown as T;
    }

    if (defaultValue === null) {
        console.error(chalk.red(`Expected one of these environment variables "${names.join('", "')}" to be set`))
        throw new Error('Invalid config.');
    }

    return defaultValue;
}

enum Environment {
    LOCAL = 'local',
    LIVE = 'live'
}

const ENVIRONMENT = get<Environment>(Environment.LOCAL, 'ENVIRONMENT');

config({
    path: `.env.${ENVIRONMENT}`
});

type Config = {
    DISCORD_CLIENT_ID: string;
    DISCORD_TOKEN: string;
    ENVIRONMENT: Environment;
    PLATFORM: string;
    LOG_LEVEL?: LogLevel;
}

export const CONFIG: Config = {
    ENVIRONMENT,
    DISCORD_CLIENT_ID: get<string>(null, 'DISCORD_CLIENT_ID'),
    DISCORD_TOKEN: get<string>(null, 'DISCORD_TOKEN'),
    PLATFORM: get<string>(null, 'PLATFORM'),
    LOG_LEVEL: get<LogLevel | undefined>(undefined, 'LOG_LEVEL')
}
