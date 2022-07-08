import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, Message, TextChannel } from 'discord.js';
import { formatJSONForReply } from '../Util/Helpers';

export const memberActivityName = 'memberactivity';

export const memberActivityCommand = new SlashCommandBuilder()
  .setName(memberActivityName)
  .setDescription('lists the developers');

export const memberActivityCommandHandler = async (
  interaction: CommandInteraction,
) => {
  const currentChannel = interaction.channel as TextChannel;
  const channelCache = interaction.guild!.channels.cache;
  const memberData: { [key: string]: number } = {};

  for (const channel of channelCache.values()) {
    if (channel instanceof TextChannel) {
      const allMessages = await getAllMessagesFromChannel(channel);

      console.log(`allMessages for ${channel.name} : `, allMessages.length);

      allMessages.forEach((message) => {
        const { username } = message.author;
        if (memberData[username]) {
          memberData[username] += 1;
        } else {
          memberData[username] = 1;
        }
      });
    }
  }

  await currentChannel.send(formatJSONForReply(memberData));
};

const getAllMessagesFromChannel = async (channel: TextChannel) => {
  const messages: Message[] = [];

  let message = await channel.messages
    .fetch({ limit: 1 })
    .then((messagePage) => (messagePage.size === 1 ? messagePage.at(0) : null));

  while (message) {
    const messageChunk = await channel.messages.fetch({
      limit: 100,
      before: message.id,
    });

    messageChunk.forEach((msg) => messages.push(msg));

    message =
      0 < messageChunk.size ? messageChunk.at(messageChunk.size - 1) : null;
  }

  return messages;
};
