import secrets from '../../config.json';
import { initializeDatabase, db } from './init';
import {
  Client,
  Collection,
  Intents,
  Message,
  TextChannel,
  User,
} from 'discord.js';

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
    await initializeDatabase();

    const usersCache = discordClient.users.cache;
    await saveUsers(usersCache);

    const channelsCache = discordClient.channels.cache;
    for (const channel of channelsCache.values()) {
      // doesnt handle thread comments
      if (channel instanceof TextChannel) {
        const messages = await fetchAllMessagesFromChannel(channel);
        await saveMessages(messages);
        console.log(`${channel.name} - ${messages.length} messages saved.`);
      }
    }

    console.log('finished');
  });
};

const fetchAllMessagesFromChannel = async (channel: TextChannel) => {
  const messages: Message[] = [];

  let message = await channel.messages
    .fetch({ limit: 1 })
    .then((messagePage) => (messagePage.size === 1 ? messagePage.at(0) : null));

  while (message) {
    const messageChunk = await channel.messages.fetch({
      limit: 100,
      before: message.id,
    });

    messageChunk.forEach((msg) => messages.push(msg));

    message =
      0 < messageChunk.size ? messageChunk.at(messageChunk.size - 1) : null;
  }

  return messages;
};

const saveMessages = async (messages: Message<boolean>[]) => {
  const collection = db.collection('messages');
  for (const message of messages) {
    const messageJSON = message.toJSON() as any;
    await collection.insertOne(messageJSON);
  }
};

const saveUsers = async (usersCache: Collection<string, User>) => {
  const collection = db.collection('users');
  for (const user of usersCache.values()) {
    const userJSON = user.toJSON() as any;
    await collection.insertOne(userJSON);
  }
};

main();
