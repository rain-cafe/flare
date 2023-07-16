import {EventEmitter} from 'events';
import type {Platform} from './types';
import { Logger } from './logger';

export class Flare extends EventEmitter {
    #options: Flare.InternalOptions;

    constructor(options: Flare.Options) {
        super();

        this.#options = options;

        this.#options.platform.authenticate().then(() => {
            this.emit('ready');

            Logger.info('Successfully authenticated with platform.');
        }).catch((error) => {
            this.emit('error', error);
        });
    }
}

export namespace Flare {
    export type Options = {
        platform: Platform;
    }

    export type InternalOptions = {
        platform: Platform;
    }
}

export {CampfirePlatform} from './campfire';
export * from './types';