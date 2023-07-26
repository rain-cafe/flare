export type FlarieMessageEmbed = {
    title: string;
    description: string;
    color: string;
};

export type FlarieMessage = {
  content?: string;
  embeds?: FlarieMessageEmbed[];
  ephemeral?: boolean;
}
