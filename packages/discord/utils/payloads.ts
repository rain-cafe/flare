import { FlarieMessageEphemeral } from '@flarie/core';
import { toFlarieMessageEphemeral } from '@flarie/core';
import { toFlarieMessage } from '@flarie/core';
import { FlarieMessage } from '@flarie/core';
import { BaseMessageOptions, InteractionReplyOptions, MessageCreateOptions } from 'discord.js';

function toDiscordBasePayload(message: string | FlarieMessage): BaseMessageOptions {
  if (typeof message === 'string') {
    return {
      content: message,
    };
  }

  return {
    content: message.content,
    embeds: message.embeds?.map((embed) => ({
      title: embed.title,
      description: embed.description,
      // TODO: Convert hex to whatever format discord wants
      // color: embed.color
    })),
  };
}

export function toDiscordSendPayload(rawMessage: string | FlarieMessage): MessageCreateOptions {
  const message = toFlarieMessage(rawMessage);

  return {
    ...toDiscordBasePayload(message),
  };
}

export function toDiscordReplyPayload(rawMessage: string | FlarieMessageEphemeral): InteractionReplyOptions {
  const message = toFlarieMessageEphemeral(rawMessage);

  return {
    ...toDiscordBasePayload(message),
    ephemeral: message.ephemeral ?? false,
  };
}
