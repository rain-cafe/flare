import { Flare, CampfirePlatform, Platform } from '@rain/flare';
import { DiscordPlatform } from '@rain/discord';
import { CONFIG } from './config';

function getPlatform(platform: string): Platform {
    switch (platform) {
        case CampfirePlatform.NAME:
            return new CampfirePlatform();
        case DiscordPlatform.NAME:
            return new DiscordPlatform({
                token: CONFIG.DISCORD_TOKEN
            });
        default:
            throw new Error(`Unknown platform! (${platform})`);
    }
}

const flare = new Flare({
    platform: getPlatform(CONFIG.PLATFORM),
});