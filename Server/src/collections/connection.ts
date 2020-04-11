import { Connection } from '@jms-1/mongodb-graphql/lib/connection'
import { MongoClient, MongoClientOptions } from 'mongodb'

import { Config } from '../config'

const clientOptions: MongoClientOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

if (Config.user) {
    clientOptions.auth = {
        password: Config.password,
        user: Config.user,
    }
}

export const MongoConnection = new Connection(MongoClient.connect(Config.db, clientOptions))
