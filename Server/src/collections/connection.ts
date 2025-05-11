import { Connection } from "@jms-1/mongodb-graphql/lib/connection";
import { MongoClient, MongoClientOptions } from "mongodb";

import { Config } from "../config";

const clientOptions: MongoClientOptions = {};

if (Config.user) {
  clientOptions.auth = { password: Config.password, username: Config.user };
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const MongoConnection = new Connection(
  MongoClient.connect(Config.db, clientOptions)
);
