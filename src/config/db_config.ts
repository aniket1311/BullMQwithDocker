import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

export class DatabaseConfiguration {
  static async connection() {
    await mongoose
      .connect(process.env.DB_CONNECTION_STRING || '')
      .then(() => {
        console.log('Database connected successfully');
      })
      .catch((error) => {
        console.log(`Unable to connect the database ${error}`);
      });
  }
}
