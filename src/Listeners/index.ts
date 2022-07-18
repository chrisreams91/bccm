import { Client } from 'discord.js';
import { memberLeftServerEvent, handleMemberLeft } from './MemberLeftServer';
import { messageCreateEvent, messageCreateHandler } from './MessageCreate';
import { addedToServerEvent, addedToServerHandler } from './AddedToServer';

export const registerListeners = (client: Client) => {
  client.on(memberLeftServerEvent, handleMemberLeft);
  client.on(messageCreateEvent, messageCreateHandler);
  client.on(addedToServerEvent, addedToServerHandler);

  console.log('Successfully registered application listeners.');
};
