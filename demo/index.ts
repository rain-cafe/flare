import { Flare, CampfirePlatform, Platform, FlareInteraction } from '@flarie/core';
import { DiscordPlatform, Partials } from '@flarie/discord';
import { CONFIG } from './config';
import { FlareCommand } from '@flarie/core/command';

function getPlatform(platform: string): Platform {
  switch (platform) {
    case CampfirePlatform.NAME:
      return new CampfirePlatform();
    case DiscordPlatform.NAME:
      return new DiscordPlatform({
        clientId: CONFIG.DISCORD_CLIENT_ID,
        token: CONFIG.DISCORD_TOKEN,
        partials: [
          Partials.GuildMember,
        ],
        intents: [
          'Guilds',
          'GuildMembers',
        ]
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

flare.on('ready', () => {
  flare.send('966502697341698108', '987612495625719829', 'Rawr!');
});
