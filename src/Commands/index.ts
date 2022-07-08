import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { clientId, guildId, token } from '../../config.json';
import { Client, CommandInteraction } from 'discord.js';
import {
  developersCommandHandler,
} from './Developers';
import {
  thoughtsCommandHandler,
} from './Thoughts'
import { SlashCommandBuilder } from '@discordjs/builders';


const commandMap: {[key: string]: {
  handler: (interaction: CommandInteraction) => Promise<void>,
  description: string
}} = {
  'thoughts': {
    handler: thoughtsCommandHandler,
    description: "thohguts?"
  },
  'developers': {
    handler: developersCommandHandler,
    description: "lists the developers"
  }
}

export const registerCommands = async (client: Client) => {
  const rest = new REST({ version: '9' }).setToken(token);
  const builtCommands = Object.keys(commandMap).map(key => {
    return new SlashCommandBuilder()
  .setName(key)
  .setDescription(commandMap[key].description);
  })
  const commands = builtCommands.map((command) => command.toJSON());

  await rest
    .put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands,
    })
    .catch(console.error);

  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;
    const { commandName } = interaction;

    await commandMap[commandName].handler(interaction);
  });

  console.log('Successfully registered application commands.');
};
