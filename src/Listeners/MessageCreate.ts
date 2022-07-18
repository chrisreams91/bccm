import { Message as DiscordMessage, TextChannel } from 'discord.js';
import User from '../Database/Entities/User.entity';
import Channel from '../Database/Entities/Channel.entity';
import AppDataSource from '../Database/config';
import Message from '../Database/Entities/Message.entity';

export const messageCreateEvent = 'messageCreate';

export const messageCreateHandler = async (newMessage: DiscordMessage) => {
  const { channel } = newMessage;
  if (channel instanceof TextChannel) {
    const messageRepo = AppDataSource.getRepository(Message);

    const guild = newMessage.guild;
    const newUser = new User(newMessage.author, guild);
    const newChannel = new Channel(channel, guild);

    //@ts-ignore
    await messageRepo.save({
      ...newMessage,
      user: newUser,
      channel: newChannel,
    });

    console.log('saved new message');
  }
};
