import { CommandInteraction } from "discord.js";

export const thoughtsCommandHandler = async (
  interaction: CommandInteraction
) => {
  const str = interaction.options.getString('input') || 'thoughts';
  const scrambled = scramble(str);
  
  await interaction.reply(scrambled);
};

const scramble = (string: String) => {
  let scrambled = string.split("");
  for (let i = 1; i < string.length; i++) {
    for (let j = i-1; j >= 0; j--) {
      // we use probability .70 to make scrambling semi unlikely, attempting to mimic actual typos.
      if (Math.random() >= 0.70) {
        const tmp = scrambled[i]
        scrambled[i] = scrambled[j];
        scrambled[j] = tmp;
      }
      else {
        break;
      }
    }
  }
  return scrambled.join("") + "?";
}