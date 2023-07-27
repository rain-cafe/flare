import { LogLevel, Logger } from '@flarie/logger';
import { config } from 'dotenv';
import path from 'node:path';

export function get<T = string>(defaultValue: T | null, ...names: string[]): T {
  for (const name of names) {
    const value = process.env[name];

    if (!value) continue;

    return value as unknown as T;
  }

  if (defaultValue === null) {
    Logger.error(`Expected one of these environment variables "${names.join('", "')}" to be set`);
    throw new Error('Invalid config.');
  }

  return defaultValue;
}

enum Environment {
  LOCAL = 'local',
  LIVE = 'live',
}

const ENVIRONMENT = get<Environment>(Environment.LOCAL, 'ENVIRONMENT');

config({
  path: path.join(__dirname, `../../.env.${ENVIRONMENT}`),
});

type Config = {
  DISCORD_CLIENT_ID: string;
  DISCORD_TOKEN: string;
  ENVIRONMENT: Environment;
  PLATFORM: string;
  LOG_LEVEL?: LogLevel;
};

const PLATFORM = get<string>('campfire', 'PLATFORM');

export const CONFIG: Config = {
  ENVIRONMENT,
  PLATFORM,
  LOG_LEVEL: get<LogLevel>(LogLevel.INFO, 'LOG_LEVEL'),
  DISCORD_CLIENT_ID: get<string>(undefined, 'DISCORD_CLIENT_ID'),
  DISCORD_TOKEN: get<string>(undefined, 'DISCORD_TOKEN'),
};
