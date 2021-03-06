import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, MessageAttachment } from 'discord.js';
import { COMMAND_NAMES } from '../../Util/Constants';
import AppDataSource from '../../Database/config';
import User from '../../Database/Entities/User.entity';
import { jsxToPNGBuffer } from './Renderer';
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
  const userRepo = AppDataSource.getRepository(User);
  const allUsersForGuild = await userRepo.find({
    where: { guildId: interaction.guildId },
  });

  let attachment: MessageAttachment;
  if (range === 1) {
    const pieData = formatPieData(allUsersForGuild);
    const pie = PieChart(pieData);

    const buf = await jsxToPNGBuffer(pie);
    attachment = new MessageAttachment(buf);
  } else {
    const lineData = formatLineData(allUsersForGuild, range);
    const lineChart = LineChart(lineData, dayToReadableMap[range]);

    const buf = await jsxToPNGBuffer(lineChart);
    attachment = new MessageAttachment(buf);
  }

  await interaction.reply({ files: [attachment] });
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
