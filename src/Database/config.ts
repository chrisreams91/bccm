import 'reflect-metadata';
import { DataSource } from 'typeorm';
import secrets from '../../config.json';
import Channel from './Entities/Channel.entity';
import User from './Entities/User.entity';
import Message from './Entities/Message.entity';

const { ENV } = process.env;
const { database } = ENV === 'PROD' ? secrets.prod : secrets.local;

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: database.host,
  port: Number(database.port),
  username: database.user,
  password: database.password,
  database: database.db,
  entities: [Message, User, Channel],
  synchronize: true,
  // logging: true,
});

export default AppDataSource;
