import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { COMMAND_NAMES } from '../Util/Constants';

const handler = async (interaction: CommandInteraction) => {
  await interaction.reply('Developed by Ben, Colin, Chris and Miles');
};

const command = new SlashCommandBuilder()
  .setName(COMMAND_NAMES.DEVELOPERS)
  .setDescription('lists the developers')
  .toJSON()
export default { handler, command };
