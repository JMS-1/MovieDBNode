import * as fs from "fs";
import * as path from "path";

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

export function loadDump(callback: (error: NodeJS.ErrnoException, data: IDump) => void): void {
    var dump = path.join(__dirname, "..", "LocalDbReader", "Movie.json");

    fs.readFile(dump, "UTF-8", (error, content) => {
        if (callback)
            if (error)
                callback(error, undefined);
            else
                callback(undefined, JSON.parse(content));
    });
}
