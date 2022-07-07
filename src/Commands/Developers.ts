import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

export const developersCommandName = "developers";

export const developersCommand = new SlashCommandBuilder()
  .setName(developersCommandName)
  .setDescription("lists the developers");

export const developersCommandHandler = async (
  interaction: CommandInteraction
) => {
  await interaction.reply("Developed by Ben, Colin, Chris and Miles");
};
