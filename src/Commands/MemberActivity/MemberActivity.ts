import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { COMMAND_NAMES } from '../../Util/Constants';
import AppDataSource from '../../Database/config';
import User from '../../Database/Entities/User.entity';
import { render } from './Renderer';
import path from 'path';
import PieChart from './PieChart';
import LineChart from './LineChart';
import { formatPieData, formatLineData } from './DataFormat';

export const dayToReadableMap = {
  30: 'One Month',
  60: 'Two Months',
  90: 'Three Months',
  120: 'Four Months',
  150: 'Five Months',
  180: 'Six Months',
};

export const handler = async (interaction: CommandInteraction) => {
  const range = interaction.options.getInteger('range') || 30;
  const messageRepo = AppDataSource.getRepository(User);
  const allUsers = await messageRepo.find();

  if (range === 1) {
    const pieData = formatPieData(allUsers);
    const pie = PieChart(pieData);

    await render(pie);
  } else {
    const lineData = formatLineData(allUsers, range);
    const lineChart = LineChart(lineData, dayToReadableMap[range]);

    await render(lineChart);
  }

  await interaction.reply({
    files: [path.join(__dirname, '../../../test.png')],
  });
};

const command = new SlashCommandBuilder()
  .setName(COMMAND_NAMES.MEMBER_ACTIVITY)
  .setDescription('Displays discord member message counts.')
  .addIntegerOption((option) =>
    option
      .setName('range')
      .addChoices(
        ...Object.keys(dayToReadableMap).map((key) => ({
          name: dayToReadableMap[key],
          value: Number(key),
        })),
        { name: 'All Time', value: 1 },
      )
      .setDescription('Message counts for the last x months.'),
  )
  .toJSON();

export default { handler, command };
