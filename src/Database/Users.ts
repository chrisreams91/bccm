import { db } from './init';

export const getAllUsers = async () => {
  const userCollection = db.collection('users');
  const cursor = userCollection.find();
  const result = await cursor.toArray();

  return result;
};
