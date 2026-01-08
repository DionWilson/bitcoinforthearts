import { MongoClient } from 'mongodb';

declare global {
  var __mongoClientPromise: Promise<MongoClient> | undefined;
}

function getMongoUri() {
  const uri = process.env.MONGODB_URI;
  if (!uri || !uri.trim()) {
    throw new Error('Missing MONGODB_URI environment variable.');
  }
  return uri.trim();
}

export async function getMongoClient() {
  if (global.__mongoClientPromise) return global.__mongoClientPromise;
  const client = new MongoClient(getMongoUri());
  global.__mongoClientPromise = client.connect();
  return global.__mongoClientPromise;
}

export async function getMongoDb() {
  const client = await getMongoClient();
  const name = (process.env.MONGODB_DB ?? 'bitcoinforthearts').trim();
  return client.db(name);
}

