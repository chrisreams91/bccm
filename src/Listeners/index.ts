import { Client } from 'discord.js';
import { memberLeftServerEvent, handleMemberLeft } from './MemberLeftServer';
import { messageCreateEvent, messageCreateHandler } from './MessageCreate';

export const registerListeners = (client: Client) => {
  client.on(memberLeftServerEvent, handleMemberLeft);

  client.on(messageCreateEvent, messageCreateHandler);

  console.log('Successfully registered application listeners.');
};
