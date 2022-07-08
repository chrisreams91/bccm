import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import secrets from '../../config.json';
import { Client } from 'discord.js';
import {
  developersCommand,
  developersCommandName,
  developersCommandHandler,
} from './Developers';
import {
  thoughtsCommand,
  thoughtsCommandHandler,
  thoughtsCommandName,
} from './Thoughts';
import { lokiCommand, lokiCommandHandler, lokiCommandName } from './Loki';
import {
  memberActivityCommand,
  memberActivityCommandHandler,
  memberActivityName,
} from './MemberActivity';

const { token, guildId, clientId } =
  process.env.ENV === 'PROD' ? secrets.prod : secrets.local;

export const registerCommands = async (client: Client) => {
  const rest = new REST({ version: '9' }).setToken(token);
  const commands = [
    developersCommand,
    thoughtsCommand,
    lokiCommand,
    memberActivityCommand,
  ].map((command) => command.toJSON());

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
      case thoughtsCommandName: {
        await thoughtsCommandHandler(interaction);
      }
      case lokiCommandName: {
        await lokiCommandHandler(interaction);
      }
      case memberActivityName: {
        await memberActivityCommandHandler(interaction);
      }
    }
  });

  console.log('Successfully registered application commands.');
};
