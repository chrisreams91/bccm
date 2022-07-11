import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, Message, TextChannel } from 'discord.js';
import { formatJSONForReply } from '../Util/Helpers';
// import { getAllMessagesForChannel } from '../Database/Messages';
// import { getAllUsers } from '../Database/Users';

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

  // const userIdToUsernameMap: { [key: string]: string } = {};
  // const users = await getAllUsers();
  // users.forEach((user) => {
  //   userIdToUsernameMap[user.id] = user.username;
  // });

  // for (const channel of channelCache.values()) {
  //   // doesnt handle thread comments
  //   if (channel instanceof TextChannel) {
  //     const messages = await getAllMessagesForChannel(channel.id);

  //     messages.forEach((message) => {
  //       const { authorId } = message;
  //       const name = userIdToUsernameMap[authorId];
  //       if (memberData[name]) {
  //         memberData[name] += 1;
  //       } else {
  //         memberData[name] = 1;
  //       }
  //     });
  //   }
  // }

  await currentChannel.send(formatJSONForReply(memberData));
};
