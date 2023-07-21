import { EventEmitter } from 'node:events';
import type { Platform } from './types';
import { LogLevel, Logger } from './logger';
import { FlarieCommand } from './command';

export class Flarie extends EventEmitter {
    #options: Flarie.InternalOptions;

    constructor({ commands, level, ...options }: Flarie.Options) {
        super();

        Logger.setLevel(level);

        this.#options = options;

        this.#options.platform.authenticate().then(async () => {
            Logger.info('Successfully authenticated with platform.');

            if (commands) {
              Logger.silly('Registering commands with platform...');

              await this.#options.platform.register(commands);

              Logger.info('Successfully registered commands with platform.');
            }
        }).catch((error) => {
            this.emit('error', error);
        });
        
        this.#options.platform.on('ready', () => this.emit('ready'));
    }

    async send(serverId: string, channelId: string, message: string): Promise<void> {
      await this.#options.platform.send(serverId, channelId, message);
    }

}

export namespace Flarie {
    export type Options = {
        platform: Platform;
        commands?: FlarieCommand[];
        level?: LogLevel;
    }

    export type InternalOptions = {
        platform: Platform;
    }
}

export {CampfirePlatform} from './campfire';
export {Logger, LogLevel} from './logger';
export {FlarieCommand} from './command';
export * from './types';