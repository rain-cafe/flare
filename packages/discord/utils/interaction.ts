import {
  FlarieContext,
  FlarieDMContext,
  FlarieInteraction,
  FlarieServerContext,
} from '@flarie/core';
import {
  CacheType,
  ChatInputCommandInteraction,
  MessageContextMenuCommandInteraction,
  UserContextMenuCommandInteraction,
} from 'discord.js';

export function getContext(
  interaction:
    | ChatInputCommandInteraction<CacheType>
    | MessageContextMenuCommandInteraction<CacheType>
    | UserContextMenuCommandInteraction<CacheType>
): FlarieContext {
  if (interaction.guild) {
    return new FlarieServerContext({
      server: {
        id: interaction.guild.id,
        name: interaction.guild.name,
      },
      channel: {
        id: interaction.channel.id,
        name: interaction.channel.name,
      },
      user: {
        id: interaction.user.id,
        username: interaction.user.username,
        displayName: interaction.user.discriminator,
        bot: interaction.user.bot,
      },
    });
  }

  return new FlarieDMContext({
    channel: {
      id: interaction.channelId,
      name: interaction.user.username,
    },
    user: {
      id: interaction.user.id,
      username: interaction.user.username,
      displayName: interaction.user.discriminator,
      bot: interaction.user.bot,
    },
  });
}

export function toFlarieInteraction(
  interaction:
    | ChatInputCommandInteraction<CacheType>
    | MessageContextMenuCommandInteraction<CacheType>
    | UserContextMenuCommandInteraction<CacheType>
): FlarieInteraction {
  return {
    async reply(message) {
      await interaction.reply(
        typeof message === 'string'
          ? {
              content: message,
            }
          : {
              content: message.content,
              ephemeral: message.ephemeral,
            }
      );

      this.replied = true;
    },

    replied: false,
    context: getContext(interaction),
  };
}
