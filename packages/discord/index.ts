import { Logger, FlarieCommand, type Platform, FlarieError } from '@flarie/core';
import { EventEmitter } from 'node:events';
import {
  BitFieldResolvable,
  Client,
  GatewayIntentsString,
  Partials,
  PermissionFlagsBits,
  REST,
  Routes,
  SlashCommandBuilder,
} from 'discord.js';
import { toFlarieInteraction } from './utils/interaction';

export class DiscordPlatform extends EventEmitter implements Platform {
  public static readonly NAME = 'discord';
  #client: Client;
  #options: DiscordPlatform.InternalOptions;
  #commands: Map<string, FlarieCommand>;

  constructor({ username, partials, intents, ...options }: DiscordPlatform.Options) {
    super();
    this.#options = options;
    this.#commands = new Map();

    this.#client = new Client({
      partials,
      intents,
    });

    this.#client.on('ready', async () => {
      this.emit('ready');

      const promises: Promise<any>[] = [];

      if (username) {
        promises.push(this.#client.user.setUsername(username));
      }

      await Promise.all(promises);
    });
  }

  async authenticate(): Promise<void> {
    await this.#client.login(this.#options.token);
  }

  async #unpublish() {
    this.#commands.clear();

    const rest = new REST({ version: '10' }).setToken(this.#options.token);

    Logger.silly('Deleting application commands...');

    await rest.put(Routes.applicationCommands(this.#options.clientId), { body: [] });

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
            .setDescription(command.description)
            .setDefaultMemberPermissions(
              command.disabled ? '0' : PermissionFlagsBits.UseApplicationCommands
            )
            .setDMPermission(command.allowDMs)
            .toJSON();
        }),
      });

      this.#client.on('interactionCreate', async (discordInteraction) => {
        if (!discordInteraction.isCommand()) return;

        const command = this.#commands.get(discordInteraction.commandName);

        if (!command) return;

        const interaction = toFlarieInteraction(discordInteraction);

        try {
          await command.invoke(interaction);

          if (!interaction.replied) {
            await interaction.reply({
              content: 'Your command completed, but you never told anyone about it! :<',
              ephemeral: true,
            });
          }
        } catch (error) {
          if (error instanceof FlarieError) {
            Logger.log(error.level, error.message);
            await interaction.reply(error.toFlarieMessage());
          } else {
            Logger.error(error.toString());
            await interaction.reply('There was an error while executing this command!');
          }
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  async send(serverId: string, channelId: string, message: string): Promise<void> {
    const guild = this.#client.guilds.cache.get(serverId);

    if (!guild) {
      Logger.error(`Invalid server requested! (${serverId})`);
      return;
    }

    const channel = await this.#client.channels.fetch(channelId);

    Logger.silly('Channel: ', channel);

    if (!channel || !channel.isTextBased()) {
      Logger.error(`Invalid channel requested! (${channelId})`);
      return;
    }

    await channel.send({
      content: message,
    });
  }
}

export namespace DiscordPlatform {
  export type Options = {
    username?: string;
    clientId: string;
    token: string;
    partials?: Partials[];
    intents: BitFieldResolvable<GatewayIntentsString, number>;
  };

  export type InternalOptions = {
    clientId: string;
    token: string;
  };
}

export { Partials } from 'discord.js';
