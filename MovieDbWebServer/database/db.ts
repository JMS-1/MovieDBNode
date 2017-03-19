import { MongoClient, Db } from 'mongodb';
import { readFile } from 'fs';

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
