import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, TextChannel } from 'discord.js';
import { formatJSONForReply } from '../../Util/Helpers';
import { COMMAND_NAMES } from '../../Util/Constants';
import AppDataSource from '../../Database/config';
import User from '../../Database/Entities/User.entity';
import { render } from './Renderer';
import path from 'path';
import PieChart from './PieChart';
import LineChart from './LineChart';
import { formatPieData, formatLineData } from './DataFormat';

export const handler = async (interaction: CommandInteraction) => {
  const messageRepo = AppDataSource.getRepository(User);
  const allUsers = await messageRepo.find();

  // const pieData = formatPieData(allUsers);
  // const pie = PieChart(pieData);
  // console.log(pieData);

  // await render(pie);

  const lineData = formatLineData(allUsers, 90);
  const lineChart = LineChart(lineData);

  await render(lineChart);
  await interaction.reply({
    files: [path.join(__dirname, '../../../test.png')],
  });
};

const command = new SlashCommandBuilder()
  .setName(COMMAND_NAMES.MEMBER_ACTIVITY)
  .setDescription('Displays discord member message counts.')
  .toJSON();

export default { handler, command };
