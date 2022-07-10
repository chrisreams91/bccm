import { db } from './init';

export const getAllMessagesForChannel = async (channelId: string) => {
  const messagesCollection = db.collection('messages');
  const cursor = messagesCollection.find({ channelId });
  const result = await cursor.toArray();

  return result;
};
