import secrets from '../../config.json';
import {
  Client,
  Intents,
  Message as DiscordMessage,
  TextChannel,
} from 'discord.js';
import AppDataSource from './config';
import Message from './Entities/Message.entity';
import User from './Entities/User.entity';
import Channel from './Entities/Channel.entity';

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

  await discordClient.login(token);

  discordClient.once('ready', async () => {
    await AppDataSource.initialize();

    try {
      const channelCache = discordClient.channels.cache;
      const messageRepo = AppDataSource.getRepository(Message);

      for (const channel of channelCache.values()) {
        // doesnt handle thread comments
        if (channel instanceof TextChannel) {
          const messages = await fetchAllMessagesFromChannel(channel);
          console.log(`${channel.name} : ${messages.length}`);

          for (const message of messages) {
            const guild = message.guild;
            const newUser = new User(message.author, guild);
            const newChannel = new Channel(channel, guild);
            const newMessage = new Message(message);

            newMessage.user = newUser;
            newMessage.channel = newChannel;
            await messageRepo.save(newMessage);
          }
        }
      }

      console.log('Finished populating Database.');
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  });
};

const fetchAllMessagesFromChannel = async (channel: TextChannel) => {
  const messages: DiscordMessage[] = [];

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

main();
