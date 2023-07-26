import { FlarieContext, FlarieDMContext, FlarieInteraction, FlarieServerContext, Logger } from '@flarie/core';
import { CacheType, ChatInputCommandInteraction, MessageContextMenuCommandInteraction, UserContextMenuCommandInteraction } from 'discord.js';

export function getContext(interaction: ChatInputCommandInteraction<CacheType> | MessageContextMenuCommandInteraction<CacheType> | UserContextMenuCommandInteraction<CacheType>): FlarieContext {
  if (interaction.guild) {
    return new FlarieServerContext({
      server: {
        id: interaction.guild.id,
        name: interaction.guild.name,
      },
      channel: {
        id: interaction.channel.id,
        name: interaction.channel.name
      }
    });
  }

  return new FlarieDMContext({
    channel: {
      id: interaction.channelId,
      name: interaction.user.username
    }
  });
}

export function toFlarieInteraction(interaction: ChatInputCommandInteraction<CacheType> | MessageContextMenuCommandInteraction<CacheType> | UserContextMenuCommandInteraction<CacheType>): FlarieInteraction {
  return {
    reply: async (message) => {
      await interaction.reply(typeof message === 'string' ? {
        content: message
      } : {
        content: message.content,
        ephemeral: message.ephemeral
      });
    },
    context: getContext(interaction)
  }
}
