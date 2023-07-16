import { Flare, CampfirePlatform, Platform, FlareInteraction } from '@flare/core';
import { DiscordPlatform } from '@flare/discord';
import { CONFIG } from './config';
import { FlareCommand } from '@flare/core/command';

function getPlatform(platform: string): Platform {
  switch (platform) {
    case CampfirePlatform.NAME:
      return new CampfirePlatform();
    case DiscordPlatform.NAME:
      return new DiscordPlatform({
        clientId: CONFIG.DISCORD_CLIENT_ID,
        token: CONFIG.DISCORD_TOKEN
      });
    default:
      throw new Error(`Unknown platform! (${platform})`);
  }
}

const flare = new Flare({
  platform: getPlatform(CONFIG.PLATFORM),
  commands: [
    new FlareCommand('ping', async (interaction: FlareInteraction) => {
      await interaction.reply('pong!')
    })
  ],
  level: CONFIG.LOG_LEVEL
});
