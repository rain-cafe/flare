import { FlarieInteraction } from '@flarie/core';
import { CacheType, ChatInputCommandInteraction, MessageContextMenuCommandInteraction, UserContextMenuCommandInteraction } from 'discord.js';

export function toFlarieInteraction(interaction: ChatInputCommandInteraction<CacheType> | MessageContextMenuCommandInteraction<CacheType> | UserContextMenuCommandInteraction<CacheType>): FlarieInteraction {
  return {
    reply: async (message) => {
      await interaction.reply(typeof message === 'string' ? {
        content: message
      } : {
        content: message.content,
        ephemeral: message.ephemeral
      });
    }
  }
}
