import { CommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { COMMAND_NAMES } from '../Util/Constants';

export const handler = async (interaction: CommandInteraction) => {
  const str = interaction.options.getString('input') || 'thoughts';
  const scrambled = scramble(str);

  await interaction.reply(scrambled);
};

const scramble = (string: String) => {
  let scrambled = string.split('');
  for (let i = 1; i < string.length; i++) {
    for (let j = i - 1; j >= 0; j--) {
      // we use probability .70 to make scrambling semi unlikely, attempting to mimic actual typos.
      if (Math.random() >= 0.7) {
        const tmp = scrambled[i];
        scrambled[i] = scrambled[j];
        scrambled[j] = tmp;
      } else {
        break;
      }
    }
  }
  const repeat_char = [] as String[];
  scrambled.forEach(char => {
    if (Math.random() > .9) {
      repeat_char.push(char)
    }
  });
  repeat_char.forEach(char => {
    const ran_idx = Math.random() * scrambled.length;
    scrambled.splice(ran_idx, 0, char as string)
  });
  return scrambled.join("") + "?";
}

const command = new SlashCommandBuilder()
  .setName(COMMAND_NAMES.THOUGHTS)
  .setDescription('Thoguhts')
  .addStringOption((stringOption) =>
    stringOption
      .setName('input')
      .setDescription('String to scramble')
      .setRequired(false),
  )
  .toJSON();

export default { handler, command };
