export type FlarieMessageEmbed = {
  title: string;
  description: string;
  color: string;
};

export type FlarieMessage = {
  content?: string;
  embeds?: FlarieMessageEmbed[];
};

export type FlarieMessageEphemeral = FlarieMessage & {
  ephemeral?: boolean;
};

export function toFlarieMessage(message: string | FlarieMessage): FlarieMessage {
  if (typeof message === 'string') {
    return {
      content: message,
    };
  }

  return message;
}

export function toFlarieMessageEphemeral(message: string | FlarieMessageEphemeral): FlarieMessageEphemeral {
  if (typeof message === 'string') {
    return {
      content: message,
    };
  }

  return message;
}
