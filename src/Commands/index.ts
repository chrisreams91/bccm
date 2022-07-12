import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { Client, CommandInteraction } from 'discord.js';
import { developersCommandHandler } from './Developers';
import { thoughtsCommandHandler } from './Thoughts';
import { lokiCommandHandler } from './Loki';
import { SlashCommandBuilder } from '@discordjs/builders';
import { COMMAND_NAMES } from '../Util/Constants';
import { memberActivityCommandHandler } from './MemberActivity';

const token = process.env.TOKEN!;
const guildId = process.env.GUILD_ID!;
const clientId = process.env.CLIENT_ID!;
console.log(token)

const commandMap: {
  [key: string]: {
    handler: (interaction: CommandInteraction) => Promise<void>;
    description: string;
  };
} = {
  [COMMAND_NAMES.THOUGHTS]: {
    handler: thoughtsCommandHandler,
    description: 'thohguts?',
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
    return new SlashCommandBuilder()
      .setName(key)
      .setDescription(commandMap[key].description);
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
