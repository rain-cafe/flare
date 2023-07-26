import { Flarie, CampfirePlatform, Platform, FlarieInteraction, FlarieCommand } from '@flarie/core';
import { DiscordPlatform, Partials } from '@flarie/discord';
import { CONFIG } from './config';

function getPlatform(platform: string): Platform {
  switch (platform) {
    case CampfirePlatform.NAME:
      return new CampfirePlatform();
    case DiscordPlatform.NAME:
      return new DiscordPlatform({
        username: 'Flarie (Dev)',
        clientId: CONFIG.DISCORD_CLIENT_ID,
        token: CONFIG.DISCORD_TOKEN,
        partials: [
          Partials.Channel,
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
      await interaction.reply({
        content: 'pong!',
        ephemeral: true
      })
    })
  ],
  level: CONFIG.LOG_LEVEL
});

flarie.on('ready', () => {
  flarie.send('966502697341698108', '987612495625719829', 'Rawr!');
});
