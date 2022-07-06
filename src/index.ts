import { Client, Intents } from "discord.js";
import { token } from "../config.json";
import { rest } from "./deploy-commands";

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once("ready", () => {
  console.log("Ready!");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === "developers") {
    await interaction.reply("Ben Colin Chris Miles");
  }
});

client.login(token);
console.log(rest.eventNames());
