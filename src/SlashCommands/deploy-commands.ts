import { SlashCommandBuilder } from "@discordjs/builders";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { clientId, guildId, token } from "../../config.json";

export const registerSlashCommands = async () => {
  const commands = [
    new SlashCommandBuilder()
      .setName("developers")
      .setDescription("lists the developers"),
  ].map((command) => command.toJSON());

  const rest = new REST({ version: "9" }).setToken(token);

  await rest
    .put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands,
    })
    .catch(console.error);

  console.log("Successfully registered application commands.");
};
