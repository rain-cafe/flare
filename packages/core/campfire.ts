import { FlarieServerContext, type FlarieMessage, type Platform } from './types';
import {cyan, magenta, bold, italic} from 'chalk';
import * as readline from 'node:readline/promises';
import {userInfo} from 'node:os';
import { EventEmitter } from 'node:events';
import { FlarieCommand } from './types/command';

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

    #log(name: string, message: FlarieMessage) {
      if (message.ephemeral) {
        console.log(magenta(italic(`[${name}][e]: ${message.content}`)));
      } else {
        console.log(cyan(`${bold(`[${name}]:`)} ${message.content}`));
      }
    }

    async send(serverId: string, channelId: string, message: string): Promise<void> {
      this.#log(CampfirePlatform.#BOT_USERNAME, {
        content: message
      })
    }

    async #requestInput() {
      this.emit('ready');

        while (true) {
            const message = await this.#rl.question('> ');

            process.stdout.clearLine(0);
            process.stdout.moveCursor(0, -1);
            process.stdout.clearLine(0);
            process.stdout.cursorTo(0);

            if (['exit', 'quit'].includes(message)) {
              process.exit(0);
            } else if (message.startsWith('/')) {
              const [name] = message.replace('/', '').split(' ');

              const command = this.#commands.get(name);

              if (!command) return;

              await command.invoke({
                reply: async (message) => {
                  this.#log(CampfirePlatform.#BOT_USERNAME, typeof message === 'string' ? {
                    content: message
                  } : message);
                },
                context: new FlarieServerContext({
                  server: {
                    id: 'server-id',
                    name: 'server-name',
                  },
                  channel: {
                    id: 'channel-id',
                    name: 'channel-name',
                  },
                })
              })
            } else {
              this.#log(this.#username, {
                content: message
              });
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

        this.#log(CampfirePlatform.#BOT_USERNAME, {
          content: `Welcome ${this.#username}!`
        });

        this.#requestInput();
    }

    async register(commands: FlarieCommand[]): Promise<void> {
      for (const command of commands) {
        this.#commands.set(command.name, command);
      }
    }
}
