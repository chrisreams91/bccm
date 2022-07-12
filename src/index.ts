import * as dotenv from 'dotenv'
dotenv.config()
import { Client, Intents } from 'discord.js';
import { registerCommands } from './Commands';
import { registerListeners } from './Listeners';

const token = process.env.TOKEN!;

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

  console.log(token);
  client.login(token);
};

main();
