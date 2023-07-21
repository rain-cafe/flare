import type { Platform } from './types';
import {cyan, bold} from 'chalk';
import * as readline from 'node:readline/promises';
import {userInfo} from 'node:os';
import { EventEmitter } from 'node:events';
import { FlarieCommand } from './command';

export class CampfirePlatform extends EventEmitter implements Platform {
    public static readonly NAME = 'campfire';
    static readonly #BOT_USERNAME = 'flarie';
    #rl: readline.Interface;
    #username: string;
    #commands: Map<string, FlarieCommand>;

    constructor() {
        super();

        this.#commands = new Map();

        this.#rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        this.#username = userInfo().username;
    }

    #log(name: string, message: string) {
        console.log(cyan(`${bold(`[${name}]:`)} ${message}`));
    }

    async send(serverId: string, channelId: string, message: string): Promise<void> {
      this.#log(CampfirePlatform.#BOT_USERNAME, message)
    }

    async #requestInput() {
      this.emit('ready');

        while (true) {
            const message = await this.#rl.question('> ');

            process.stdout.clearLine(0);
            process.stdout.moveCursor(0, -1);
            process.stdout.clearLine(0);
            process.stdout.cursorTo(0);

            if (message.startsWith('/')) {
              const [name] = message.replace('/', '').split(' ');

              const command = this.#commands.get(name);

              if (!command) return;

              await command.invoke({
                reply: async (message) => this.#log(CampfirePlatform.#BOT_USERNAME, message)
              })
            } else {
              this.#log(this.#username, message);
              this.emit('message', {
                  id: this.#username,
                  username: this.#username,
                  message: message
              });
            }
        }
    }

    async authenticate(): Promise<void> {
        await new Promise((resolve) => setTimeout(resolve));

        this.#log(CampfirePlatform.#BOT_USERNAME, `Welcome ${this.#username}!`);

        this.#requestInput();
    }

    async register(commands: FlarieCommand[]): Promise<void> {
      for (const command of commands) {
        this.#commands.set(command.name, command);
      }
    }
}
