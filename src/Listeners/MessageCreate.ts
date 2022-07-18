import { Message as DiscordMessage, TextChannel } from 'discord.js';
import User from '../Database/Entities/User.entity';
import Channel from '../Database/Entities/Channel.entity';
import AppDataSource from '../Database/config';
import Message from '../Database/Entities/Message.entity';

export const messageCreateEvent = 'messageCreate';

export const messageCreateHandler = async (message: DiscordMessage) => {
  const { channel } = message;
  if (channel instanceof TextChannel) {
    const messageRepo = AppDataSource.getRepository(Message);

    const guild = message.guild;
    const newUser = new User(message.author, guild);
    const newChannel = new Channel(channel, guild);
    const newMessage = new Message(message);

    newMessage.user = newUser;
    newMessage.channel = newChannel;
    await messageRepo.save(newMessage);
  }
};
