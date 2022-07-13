import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, TextChannel } from 'discord.js';
import { formatJSONForReply } from '../../Util/Helpers';
import { COMMAND_NAMES } from '../../Util/Constants';
import AppDataSource from '../../Database/config';
import User from '../../Database/Entities/User.entity';
import { render } from './Renderer';
import path from 'path';

export const handler = async (interaction: CommandInteraction) => {
  // const currentChannel = interaction.channel as TextChannel;
  // const memberData: { [key: string]: number } = {};

  // const messageRepo = AppDataSource.getRepository(User);
  // const allUsers = await messageRepo.find();

  // allUsers.forEach((user) => {
  //   memberData[user.username] = user.messages.length;
  // });

  // await currentChannel.send(formatJSONForReply(memberData));

  await render();
  await interaction.reply({
    files: [path.join(__dirname, '../../../test.png')],
  });
};

const command = new SlashCommandBuilder()
  .setName(COMMAND_NAMES.MEMBER_ACTIVITY)
  .setDescription('Displays discord member message counts.')
  .toJSON();

export default { handler, command };
