import { Db, MongoClient } from 'mongodb';
import secrets from '../../config.json';

const {
  database: { user, password, url },
} = process.env.ENV === 'PROD' ? secrets.prod : secrets.local;

const uri = `mongodb://${user}:${password}@${url}`;
export const client = new MongoClient(uri);

export let db: Db;

export const initializeDatabase = async () => {
  await client.connect();
  console.log('Successfully connected to database.');
  const database = client.db('database');

  db = database;
};
