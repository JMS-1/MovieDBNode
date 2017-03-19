import { MongoClient, Db } from 'mongodb';

export async function connect(): Promise<Db> {
    return MongoClient.connect("mongodb://localhost:27017/movieDb");
}
