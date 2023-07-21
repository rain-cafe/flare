import { FlareInteraction } from '@flarie/core';
import { CacheType, ChatInputCommandInteraction, MessageContextMenuCommandInteraction, UserContextMenuCommandInteraction } from 'discord.js';

export function toFlareInteraction(interaction: ChatInputCommandInteraction<CacheType> | MessageContextMenuCommandInteraction<CacheType> | UserContextMenuCommandInteraction<CacheType>): FlareInteraction {
  return {
    reply: async (message) => {
      await interaction.reply({
        content: message
      });
    }
  }
}
