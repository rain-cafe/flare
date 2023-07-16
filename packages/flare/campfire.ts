import type { Platform } from './types';
import chalk from 'chalk';
import * as readline from 'readline/promises';
import {userInfo} from 'os';
import EventEmitter from 'events';

export class CampfirePlatform extends EventEmitter implements Platform {
    public static readonly NAME = 'campfire';
    private rl: readline.Interface;
    private username: string;

    constructor() {
        super();

        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        this.username = userInfo().username;
    }

    private log(name: string, message: string) {
        console.log(chalk.cyan(`${chalk.bold(`[${name}]:`)} ${message}`));
    }

    private async requestInput() {
        while (true) {
            const message = await this.rl.question('> ');

            process.stdout.clearLine(0);
            process.stdout.moveCursor(0, -1);
            process.stdout.clearLine(0);
            process.stdout.cursorTo(0);

            this.log(this.username, message);
            this.emit('message', {
                id: this.username,
                username: this.username,
                message: message
            });
        }
    }
    
    async authenticate(): Promise<void> {
        await new Promise((resolve) => setTimeout(resolve));

        this.log('flare', `Welcome ${this.username}!`);

        this.requestInput();
    }
}
