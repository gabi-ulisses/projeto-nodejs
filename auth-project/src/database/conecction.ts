import { open, Database } from 'sqlite';
import sqlite3 from 'sqlite3';

export const connection = async (): Promise<Database<sqlite3.Database, sqlite3.Statement>> => {
  return open({
    filename: './database.db',
    driver: sqlite3.Database
  });
};
