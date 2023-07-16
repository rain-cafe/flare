import {EventEmitter} from 'events';
import type {Platform} from './types';
import { LogLevel, Logger } from './logger';
import { FlareCommand } from './command';

export class Flare extends EventEmitter {
    #options: Flare.InternalOptions;

    constructor({ commands, level, ...options }: Flare.Options) {
        super();

        Logger.setLevel(level);

        this.#options = options;

        this.#options.platform.authenticate().then(async () => {
            this.emit('ready');

            Logger.info('Successfully authenticated with platform.');

            if (commands) {
              Logger.silly('Registering commands with platform...');

              await this.#options.platform.register(commands);

              Logger.info('Successfully registered commands with platform.');
            }
        }).catch((error) => {
            this.emit('error', error);
        });
    }
}

export namespace Flare {
    export type Options = {
        platform: Platform;
        commands?: FlareCommand[];
        level?: LogLevel;
    }

    export type InternalOptions = {
        platform: Platform;
    }
}

export {CampfirePlatform} from './campfire';
export * from './types';
