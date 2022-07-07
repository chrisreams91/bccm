import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { clientId, guildId, token } from '../../config.json';
import { Client } from 'discord.js';
import {
  developersCommand,
  developersCommandName,
  developersCommandHandler,
} from './Developers';

export const registerCommands = async (client: Client) => {
  const rest = new REST({ version: '9' }).setToken(token);
  const commands = [developersCommand].map((command) => command.toJSON());

  await rest
    .put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands,
    })
    .catch(console.error);

  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;
    const { commandName } = interaction;

    switch (commandName) {
      case developersCommandName: {
        await developersCommandHandler(interaction);
      }
    }
  });

  console.log('Successfully registered application commands.');
};
