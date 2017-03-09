import { MongoClient, Db } from 'mongodb';

export function connect(): Promise<Db> {
    return MongoClient.connect("mongodb://localhost:27017/movieDb") as Promise<Db>;
}
