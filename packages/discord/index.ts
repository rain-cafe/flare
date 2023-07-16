import type {Platform} from '@rain/flare';
import EventEmitter from 'events';
import {Client} from 'discord.js';

export class DiscordPlatform extends EventEmitter implements Platform {
    public static readonly NAME = 'discord';
    private client: Client;
    private options: DiscordPlatform.Options;

    constructor(options: DiscordPlatform.Options) {
        super();
        this.options = options;

        this.client = new Client({
            partials: [],
            intents: []
        });
    }
    
    async authenticate(): Promise<void> {
        await this.client.login(this.options.token);
    }
}

export namespace DiscordPlatform {
    export type Options = {
        token: string;
    }
}
