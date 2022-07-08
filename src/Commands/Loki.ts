import { CommandInteraction } from 'discord.js';
import * as path from 'path';

export const lokiCommandHandler = async (interaction: CommandInteraction) => {
  await interaction.reply({
    files: [path.join(__dirname, '../../assets/Loki.png')],
  });
};
