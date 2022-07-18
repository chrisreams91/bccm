import { Guild } from 'discord.js';

export const addedToServerEvent = 'guildCreate';

export const addedToServerHandler = async (guild: Guild) => {
  console.log('Added to new Guild : ', guild.name);
};
