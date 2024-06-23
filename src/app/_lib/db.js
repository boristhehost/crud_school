import { MongoClient } from "mongodb";

const connectToDb = async () => {
  try {
    // const client = await MongoClient.connect("mongodb://localhost:27017/new2");
    const client = await MongoClient.connect(
      process.env.MONGODB_CONNECTION_STRING
    );
    const dbConnection = client.db();

    return { dbConnection };
  } catch (err) {
    return { err };
  }
};

export { connectToDb };
