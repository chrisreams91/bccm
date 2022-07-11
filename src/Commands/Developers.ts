import { CommandInteraction } from "discord.js";

export const developersCommandName = "developers";

export const developersCommandHandler = async (
  interaction: CommandInteraction
) => {
  await interaction.reply("Developed by Ben, Colin, Chris and Miles");
};
