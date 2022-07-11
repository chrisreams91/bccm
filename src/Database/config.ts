import 'reflect-metadata';
import { DataSource } from 'typeorm';
import secrets from '../../config.json';

const { ENV } = process.env;
const { database } = ENV === 'PROD' ? secrets.prod : secrets.local;

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: database.host,
  port: Number(database.port),
  username: database.user,
  password: database.password,
  database: database.db,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  // logging: true,
  synchronize: true,
});

export default AppDataSource;
