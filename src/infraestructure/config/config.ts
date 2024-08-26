import mongoose, { Mongoose } from "mongoose";

export const databaseProvider = (): Promise<void> => {
  return mongoose
    .connect(`${process.env.MONGODB_URI}`, {
      dbName: process.env.MONGODB_DB_NAME,
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error(
        `[database]: Error connecting to MongoDB: ${error.message}`
      );
      throw new Error("[database]: Error connecting to MongoDB");
    });
};
