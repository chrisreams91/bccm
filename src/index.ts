import { Client, Intents } from 'discord.js';
import { registerCommands } from './Commands';
import { registerListeners } from './Listeners';
import secrets from '../config.json';
import AppDataSource from './Database/config';

const { ENV, DB } = process.env;
const { token } = ENV === 'PROD' ? secrets.prod : secrets.local;

const main = async () => {
  try {
    const discordClient = new Client({
      intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_PRESENCES,
      ],
    });

    await discordClient.login(token);

    discordClient.once('ready', async () => {
      if (DB) {
        await AppDataSource.initialize();
        console.log('Successfully connected to database.');
      }
      await registerCommands(discordClient);
      registerListeners(discordClient);

      console.log('App is ready!');
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

main();
