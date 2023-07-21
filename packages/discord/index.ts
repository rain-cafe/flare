import type { Platform } from '@flarie/core';
import { EventEmitter } from 'node:events';
import { BitFieldResolvable, Client, GatewayIntentsString, Partials, REST, Routes, SlashCommandBuilder } from 'discord.js';
import { FlarieCommand } from '@flarie/core/command';
import { Logger } from '@flarie/core/logger';
import { toFlarieInteraction } from './utils/interaction';

export class DiscordPlatform extends EventEmitter implements Platform {
  public static readonly NAME = 'discord';
  #client: Client;
  #options: DiscordPlatform.InternalOptions;
  #commands: Map<string, FlarieCommand>;

  constructor({partials, intents, ...options}: DiscordPlatform.Options) {
    super();
    this.#options = options;
    this.#commands = new Map();

    this.#client = new Client({
      partials,
      intents
    });
  }

  async authenticate(): Promise<void> {
    await this.#client.login(this.#options.token);
  }

  async #unpublish() {
    this.#commands.clear();

    const rest = new REST({ version: '10' }).setToken(this.#options.token);

    Logger.silly('Deleting application commands...');

    await rest.put(Routes.applicationCommands(this.#options.clientId), { body: [] })

    Logger.info('Successfully deleted all application commands.');
  }

  async register(commands: FlarieCommand[]): Promise<void> {
    const rest = new REST({ version: '10' }).setToken(this.#options.token);

    try {
      await this.#unpublish();

      for (const command of commands) {
        this.#commands.set(command.name, command);
      }

      await rest.put(Routes.applicationCommands(this.#options.clientId), {
        body: commands.map((command) => {
          return new SlashCommandBuilder()
            .setName(command.name)
            .setDescription('rawr')
            .setDefaultMemberPermissions('0')
            .setDMPermission(false)
            .toJSON();
        })
      });

      this.#client.on('interactionCreate', async (interaction) => {
        if (!interaction.isCommand()) return;

        const command = this.#commands.get(interaction.commandName);

        if (!command) return;

        try {
          await command.invoke(toFlarieInteraction(interaction));
        } catch (error) {
          await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }

        if (!interaction.replied) {
          await interaction.reply({
            content: 'Your command completed, but you never told anyone about it! :<',
            ephemeral: true
          });
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  async send(serverId: string, channelId: string, message: string): Promise<void> {
    const guild = this.#client.guilds.cache.get(serverId);

    if (!guild) {
      Logger.error(`Invalid server requested! ()`);
      return;
    }

    const channel = await this.#client.channels.cache.get(channelId);

    if (!channel || !channel.isTextBased()) {
      Logger.error(`Invalid channel requested! ()`);
      return;
    }

    await channel.send({
      content: message
    });
  }
}

export namespace DiscordPlatform {
  export type Options = {
    clientId: string;
    token: string;
    partials?: Partials[];
    intents: BitFieldResolvable<GatewayIntentsString, number>;
  }

  export type InternalOptions = {
    clientId: string;
    token: string;
  }
}

export {Partials} from 'discord.js';
