import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, TextChannel } from 'discord.js';
import { formatJSONForReply } from '../Util/Helpers';
import AppDataSource from '../Database/config';
import User from '../Database/Entities/User.entity';

export const memberActivityName = 'memberactivity';

export const memberActivityCommand = new SlashCommandBuilder()
  .setName(memberActivityName)
  .setDescription('lists the developers');

export const memberActivityCommandHandler = async (
  interaction: CommandInteraction,
) => {
  const currentChannel = interaction.channel as TextChannel;
  const memberData: { [key: string]: number } = {};

  const messageRepo = AppDataSource.getRepository(User);
  const allUsers = await messageRepo.find();

  allUsers.forEach((user) => {
    memberData[user.username] = user.messages.length;
  });

  await currentChannel.send(formatJSONForReply(memberData));
};
