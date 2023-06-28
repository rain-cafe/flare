import type {Platform} from '@rain/flare';
import EventEmitter from 'events';

export class DiscordPlatform extends EventEmitter implements Platform {
    async authenticate(): Promise<void> {
        await new Promise((resolve) => setTimeout(resolve));
    }
}