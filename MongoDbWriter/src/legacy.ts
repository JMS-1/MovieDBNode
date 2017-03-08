import { join } from "path";
import { Db } from "mongodb";
import { readFile } from "fs";
import { Promise } from '~mongodb~es6-promise';

import * as model from "./model";

export interface IContainer {
    Id: string;

    Name: string;

    Type: number;

    Description: string;

    Parent: string;

    ParentLocation: string;
}

export interface IDump {
    Containers: IContainer[];
}

var _containerId = 0;

function migrateContainer(old: IContainer): model.IContainer {
    return {
        parentId: null,
        name: old.Name,
        type: old.Type,
        _id: ++_containerId,
        location: old.ParentLocation || null,
        description: old.Description || null
    };
}

function migrateContainers(old: IContainer[], db: Db): Promise<Db> {
    return db
        .dropCollection(model.containerCollection)
        .then(success => success, error => null)
        .then(success => {
            var containerCollection = db.collection(model.containerCollection);

            var containers = [];

            var idMap: { [id: string]: model.IContainer; } = {};
            var parentMap: { [id: string]: string; } = {};

            for (var oldContainer of old) {
                var container = migrateContainer(oldContainer);

                idMap[oldContainer.Id] = container;

                if (oldContainer.Parent)
                    parentMap[oldContainer.Id] = oldContainer.Parent;

                containers.push(container);
            }

            for (var id in parentMap)
                if (parentMap.hasOwnProperty(id))
                    idMap[id].parentId = idMap[parentMap[id]]._id;

            return containerCollection.insertMany(containers);
        })
        .then(result => db);
}

export function migrate(db: Db): Promise<Db> {
    var promiseFactory: any = global.Promise;

    return new promiseFactory((resolve, reject) => {
        var dump = join(__dirname, "..", "..", "LocalDbReader", "Movie.json");

        readFile(dump, "UTF-8", (error, content) => {
            if (error)
                reject(error);
            else {
                var dump = JSON.parse(content);

                resolve(migrateContainers(dump.Containers || [], db));
            }
        });
    });
}
