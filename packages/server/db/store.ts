/**
 * AayWorks - Reimagining the way India works!
 * Database    :  MongoDB Store
 * Author      :  Ankur Daharwal
 * Filename    :  store.ts
 * Library     :  mongodb [https://docs.mongodb.com/]
 *
 * ErrorCodes
 *        500  :  Database connection failed
 *        501  :  AayWorks API is not running
 *        502  :  Invalid document type
 */

import ky from "ky-universal";
import { Collection, Db, MongoClient } from "mongodb";
import { ErrorCode } from "../utils";
import { allValidTypeNames, UserProfile } from "../schema";

// environment variables
const { MONGO_SERVER, SERVER_URL } = process.env;

// store variables
let db: Db;
let userProfileCollection: Collection<UserProfile>;

// initialize db
export const init = async () => {
  try {
    const { name } = await ky.get(`${SERVER_URL}/info`).json();
    if (!name) throw new ErrorCode(`AayWorks Service is not running`, 501);
    const dbName = `${name}_DB`;
    const client = new MongoClient(MONGO_SERVER, { useUnifiedTopology: true });
    await client.connect();
    db = client.db(dbName);
    userProfileCollection = db.collection(allValidTypeNames[0]);
    await userProfileCollection.createIndex({ userId: 1 }, { unique: true });
    return userProfileCollection;
  } catch (error) {
    throw new ErrorCode(`Could not initiate Mongo DB - ${error.message}`, 500);
  }
};

// save a single document
export const saveDocument = async (type: string, document: any) => {
  if (allValidTypeNames.includes(type)) {
    db.collection(type).insertOne(document);
  } else
    throw new ErrorCode(
      `Invalid document type, ${typeof document}, found while saving documents`,
      502
    );
};

// save many documents
export const saveDocuments = async (type: string, documents: Array<any>) => {
  if (allValidTypeNames.includes(type)) {
    db.collection(type).insertMany(documents);
  } else
    throw new ErrorCode(
      `Invalid document type, ${type}, found while saving documents`,
      502
    );
};

// reset all collections
export const resetCollections = async (types: Array<string>) => {
  types.forEach(async (type) => {
    if (allValidTypeNames.includes(type)) {
      if ((await db.collection(type).countDocuments()) > 0)
        await db.collection(type).deleteMany({});
    }
  });
};
