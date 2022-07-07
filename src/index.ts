import { Client, Intents } from "discord.js";
import { token } from "../config.json";
import { registerSlashCommands } from "./SlashCommands/deploy-commands";
import { registerListeners } from "./Listeners";
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_PRESENCES,
  ],
});

client.once("ready", () => {
  console.log("Ready!");
  registerSlashCommands();
  registerListeners(client);
});

client.on("interactionCreate", async (interaction) => {
  console.log(interaction);
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === "developers") {
    await interaction.reply("Ben Colin Chris Miles1");
  }
});

client.login(token);
