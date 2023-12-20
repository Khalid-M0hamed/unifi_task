import mongoose, { ConnectOptions, Connection, Mongoose } from 'mongoose';
import { seedUsers } from './seeders/user.seeder';
require("dotenv").config();

const env = process.env.NODE_ENV || "development";

export class Database {
  static _instance: Database;
  static get Instance() {
    if (!Database._instance) Database._instance = new Database();
    return Database._instance;
  }
  constructor() {}
  public async connect() {
    try {
        const dbConnectionString = process.env.DB_CONNECTION_STRING;
        if (!dbConnectionString) {
            console.error('DB_CONNECTION_STRING is not defined');
            process.exit(1);
        }

      return  mongoose
        .connect(dbConnectionString)
        .then(() => {
          console.log('Connected to the database');
        //  seedUsers()
        })
        .catch((error) => {
          console.error('Error connecting to the database:', error);
        });
      
    } catch (err) {
      console.log(err);
    }
  }
 
}