import { REST } from '@discordjs/rest';
import { RESTPostAPIApplicationCommandsJSONBody, Routes } from 'discord-api-types/v9';
import { Client, CommandInteraction } from 'discord.js';
import secrets from '../../config.json';
import { COMMAND_NAMES } from '../Util/Constants';
import developers from './Developers';
import thoughts from './Thoughts';
import loki from './Loki';
import memberActivity from './MemberActivity';

const commandMap: {
  [key: string]: {
    handler: (interaction: CommandInteraction) => Promise<void>;
    command: RESTPostAPIApplicationCommandsJSONBody;
  };
} = {
  [COMMAND_NAMES.DEVELOPERS]: developers,
  [COMMAND_NAMES.LOKI]: loki,
  [COMMAND_NAMES.THOUGHTS]: thoughts,
  [COMMAND_NAMES.MEMBER_ACTIVITY]: memberActivity,
};

const commands = Object.values(commandMap).map((mapping) => mapping.command);

const { token, guildId, clientId } =
  process.env.ENV === 'PROD' ? secrets.prod : secrets.local;

export const registerCommands = async (client: Client) => {
  const rest = new REST({ version: '9' }).setToken(token);
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
