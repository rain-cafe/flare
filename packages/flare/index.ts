import {EventEmitter} from 'events';
import type {Platform} from './types';

export class Flare extends EventEmitter {
    private options: Flare.Options;

    constructor(options: Flare.Options) {
        super();

        this.options = options;

        this.options.platform.authenticate().then(() => {
            this.emit('ready');
        }).catch((error) => {
            this.emit('error', error);
        });
    }
}

export namespace Flare {
    export type Options = {
        platform: Platform;
    }
}

export {CampfirePlatform} from './campfire';

export {
    Platform
};