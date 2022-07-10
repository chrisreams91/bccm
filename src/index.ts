import { Client, Intents } from 'discord.js';
import { registerCommands } from './Commands';
import { registerListeners } from './Listeners';
import secrets from '../config.json';
import { initializeDatabase } from './Database/init';

const { ENV, DB } = process.env;
const { token } = ENV === 'PROD' ? secrets.prod : secrets.local;

const main = async () => {
  const discordClient = new Client({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MEMBERS,
      Intents.FLAGS.GUILD_PRESENCES,
    ],
  });

  discordClient.login(token);

  discordClient.once('ready', async () => {
    if (DB) {
      await initializeDatabase();
    }
    await registerCommands(discordClient);
    registerListeners(discordClient);

    console.log('App is ready!');
  });
};

main();
