import { MongoClient, Db } from 'mongodb';
import { readFile } from 'fs';

import * as uuid from 'uuid/v4';

import { recordingCollection } from "./model";
import { IName, IUnique } from "../routes/protocol";

export interface IDatabaseConfiguration {
    server: string;

    port: number;

    database: string;
}

export interface IConfiguration {
    mongo: IDatabaseConfiguration;
}

async function configurationPromise(): Promise<IConfiguration> {
    return new Promise<IConfiguration>(setResult => readFile("config.json", "utf8", (err, data) => setResult(JSON.parse(data.substring(1)))));
}

export var configuration = configurationPromise();

export async function connect(): Promise<Db> {
    var config = await configuration;

    return MongoClient.connect(`mongodb://${config.mongo.server}:${config.mongo.port}/${config.mongo.database}`);
}

async function ensureNameIndex(collection: string): Promise<Db> {
    var db = await connect();
    var index = await db.collection(collection).createIndex({ name: 1 }, { name: `${collection}_Unique`, unique: true });

    return new Promise<Db>(setResult => setResult(db));
}

export async function deleteName(id: string, collection: string): Promise<boolean> {
    var db = await ensureNameIndex(collection);
    var result = await db.collection(collection).deleteOne({ _id: id });

    return new Promise<boolean>(setResult => setResult(result.deletedCount === 1));
}

export async function addName(item: IName, collection: string): Promise<boolean> {
    var newItem = { name: item.name, _id: uuid() };

    var db = await ensureNameIndex(collection);
    var result = await db.collection(collection).insertOne(newItem);

    return new Promise<boolean>(setResult => setResult(result.insertedCount === 1));
}

export async function updateName(id: string, item: IName, collection: string): Promise<boolean> {
    var newItem = { name: item.name };

    var db = await ensureNameIndex(collection);
    var result = await db.collection(collection).updateOne({ _id: id }, { $set: newItem });

    return new Promise<boolean>(setResult => setResult(result.matchedCount === 1));
}

export async function findName<TResultType extends IName & IUnique & { unused: boolean; }>(id: string, collection: string, usage: string): Promise<TResultType> {
    var db = await ensureNameIndex(collection);
    var item = await db.collection(collection).findOne({ _id: id });
    var itemUsage = await db.collection(recordingCollection).findOne({ [usage]: { $elemMatch: { $eq: item._id } } });

    return new Promise<TResultType>(setResult => setResult(<TResultType>{
        id: item._id,
        name: item.name,
        unused: !itemUsage
    }));
}




