import {
  Collection,
  GuildMember,
  Message,
  PartialGuildMember,
  TextChannel,
} from 'discord.js';
import { MILES, GENERAL_CHANNEL, MINUTE } from '../Util/Constants';

export const memberLeftServerEvent = 'guildMemberRemove';

export const handleMemberLeft = async (
  guildMember: GuildMember | PartialGuildMember,
) => {
  const { user } = guildMember;

  const channelCache = guildMember.client.channels.cache;
  const general = channelCache.get(GENERAL_CHANNEL) as TextChannel;

  if (user.id !== MILES) {
    await general.send(`${user.username} has left the server.`);
  } else {
    let stealthExit = true;

    for (const channel of channelCache.values()) {
      if (channel.isText()) {
        const messages = await channel.messages.fetch({ limit: 100 });
        const recent = recentMessages(messages);

        const fromMiles = recent.filter(
          (message) => message.author.id === MILES,
        );

        if (fromMiles.size > 0) {
          stealthExit = false;
        }
      }
    }

    if (stealthExit) {
      await general.send(
        `Looks like miles made another sneaky exit better go check in on him.`,
      );
    } else {
      await general.send(`${user.username} has left the server.`);
    }
  }
};

const recentMessages = (messages: Collection<string, Message<boolean>>) => {
  const currentTime = Date.now();
  const lastThirtyMinutes = currentTime - MINUTE * 30;

  return messages.filter(
    (message) => message.createdTimestamp > lastThirtyMinutes,
  );
};
