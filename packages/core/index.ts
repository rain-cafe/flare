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

        const promises: Promise<void>[] = [];

        promises.push(this.#options.platform.authenticate().then(async () => {
            Logger.info('Successfully authenticated with platform.');

            if (commands) {
              await this.#register(commands);
            }
        }));

        promises.push(new Promise((resolve) => this.#options.platform.once('ready', () => resolve())));

        Promise.all(promises).then(() => {
          this.emit('ready');
        }).catch((errors) => {
          this.emit('error', errors);
        });
    }

    async #register(commands: FlarieCommand[]): Promise<void> {
      Logger.silly('Registering commands with platform...');

      await this.#options.platform.register(commands);

      Logger.info('Successfully registered commands with platform.');
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
