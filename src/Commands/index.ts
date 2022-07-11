import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { Client, CommandInteraction } from 'discord.js';
import { developersCommandHandler } from './Developers';
import { thoughtsCommandHandler } from './Thoughts';
import { lokiCommandHandler } from './Loki';
import { SlashCommandBuilder } from '@discordjs/builders';
import { COMMAND_NAMES, COMMAND_OPTION_TYPE } from '../Util/Constants';
import { memberActivityCommandHandler } from './MemberActivity';

import secrets from '../../config.json';
const { token, guildId, clientId } =
  process.env.ENV === 'PROD' ? secrets.prod : secrets.local;

const commandMap: {
  [key: string]: {
    handler: (interaction: CommandInteraction) => Promise<void>;
    description: string;
    options?: [
      {
        name: string;
        description: string;
        required: boolean;
        type: COMMAND_OPTION_TYPE;
      },
    ];
  };
} = {
  [COMMAND_NAMES.THOUGHTS]: {
    handler: thoughtsCommandHandler,
    description: 'thohguts?',
    options: [
      {
        name: 'input',
        description: 'String to scramble',
        required: false,
        type: 'string',
      },
    ],
  },
  [COMMAND_NAMES.DEVELOPERS]: {
    handler: developersCommandHandler,
    description: 'lists the developers',
  },
  [COMMAND_NAMES.LOKI]: {
    handler: lokiCommandHandler,
    description: 'Displays a lovely picture of an even more lovely cat',
  },
  [COMMAND_NAMES.MEMBER_ACTIVITY]: {
    handler: memberActivityCommandHandler,
    description: 'Displays member activity',
  },
};

export const registerCommands = async (client: Client) => {
  const rest = new REST({ version: '9' }).setToken(token);
  const builtCommands = Object.keys(commandMap).map((key) => {
    const config = commandMap[key];
    const command = new SlashCommandBuilder()
      .setName(key)
      .setDescription(config.description);

    if (config.options && config.options.length) {
      config.options.forEach((option) => {
        if (option.type === 'string') {
          command.addStringOption((stringOption) =>
            stringOption
              .setName(option.name)
              .setDescription(option.description)
              .setRequired(option.required),
          );
        }
      });
    }

    return command;
  });
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
