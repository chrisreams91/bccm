import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import * as path from 'path';

export const lokiCommandName = 'loki';

export const lokiCommand = new SlashCommandBuilder()
  .setName(lokiCommandName)
  .setDescription('Displays a lovely picture of an even more lovely cat.');

export const lokiCommandHandler = async (interaction: CommandInteraction) => {
  await interaction.reply({
    files: [path.join(__dirname, '../../assets/Loki.png')],
  });
};
