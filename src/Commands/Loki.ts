import * as path from 'path';
import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { COMMAND_NAMES } from '../Util/Constants';

const handler = async (interaction: CommandInteraction) => {
  await interaction.reply({
    files: [path.join(__dirname, '../../assets/Loki.png')],
  });
};

const command = new SlashCommandBuilder()
  .setName(COMMAND_NAMES.LOKI)
  .setDescription('Displays a lovely picture of an even more lovely cat')
  .toJSON();

export default { handler, command };
