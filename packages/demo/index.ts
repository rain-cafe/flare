import { Flarie, CampfirePlatform, Platform, FlarieInteraction } from '@flarie/core';
import { DiscordPlatform, Partials } from '@flarie/discord';
import { CONFIG } from './config';
import { FlarieCommand } from '@flarie/core/command';

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

const flarie = new Flarie({
  platform: getPlatform(CONFIG.PLATFORM),
  commands: [
    new FlarieCommand('ping', async (interaction: FlarieInteraction) => {
      await interaction.reply('pong!')
    })
  ],
  level: CONFIG.LOG_LEVEL
});

flarie.on('ready', () => {
  flarie.send('966502697341698108', '987612495625719829', 'Rawr!');
});
