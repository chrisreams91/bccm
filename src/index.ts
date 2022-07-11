import { Client, Intents } from 'discord.js';
import { registerCommands } from './Commands';
import { registerListeners } from './Listeners';
import secrets from '../config.json';

const { token } = process.env.ENV === 'PROD' ? secrets.prod : secrets.local;

const main = async () => {
  const client = new Client({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MEMBERS,
      Intents.FLAGS.GUILD_PRESENCES,
    ],
  });

  client.once('ready', async () => {
    await registerCommands(client);
    registerListeners(client);

    console.log('App is ready!');
  });

  client.login(token);
};

main();
