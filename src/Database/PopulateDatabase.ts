import secrets from '../../config.json';
import {
  Client,
  Collection,
  Intents,
  Message,
  TextChannel,
  User as DiscordUser,
} from 'discord.js';
import AppDataSource from './config';
import User from '../Entities/User.entity';

const { token } = process.env.ENV === 'PROD' ? secrets.prod : secrets.local;

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
    await AppDataSource.initialize();
    try {
      const usersCache = discordClient.users.cache;
      await saveUsers(usersCache);

      console.log('finished');
    } catch (error) {
      console.log(error);
    }
  });
};

const saveUsers = async (usersCache: Collection<string, DiscordUser>) => {
  for (const user of usersCache.values()) {
    // console.log('mathc : ', matchingMember);
    const repo = AppDataSource.getRepository(User);

    // console.log('user : ', user);
    const results = await repo.save(user);
    console.log('results 111: ', results);
  }
};

main();
