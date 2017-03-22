import { Router, Request, Response } from 'express';
import { Parsed } from 'body-parser';

import { connect, addName, updateName, findName, deleteName } from '../database/db';
import { containerCollection, IContainer, recordingCollection, IRecording, mediaCollection, IMedia, IDbUnique, IDbName } from '../database/model';

import { IContainerItem, IContainerEdit, IContainerRecording, seriesSeparator, getSeriesMap, sendJson, sendStatus } from './protocol';

async function findContainer(id: string): Promise<IContainerEdit> {
    var seriesMap = await getSeriesMap();

    return findName<IContainerEdit, IContainer>(id, containerCollection, async (db, result, item) => {
        var children: IDbName[] = await db.collection(containerCollection).find({ container: id }, { _id: 0, name: 1 }).sort({ name: 1 }).toArray();
        var media: { _id: string; position: string; }[] = await db.collection(mediaCollection).find({ container: id }, { _id: 1, position: 1 }).toArray();
        var recordings: { _id: string; name: string; media: string; series?: string; }[] = await db.collection(recordingCollection).find({ media: { $in: media.map(m => m._id) } }, { name: 1, media: 1, series: 1 }).toArray();

        var mediaMap: { [id: string]: string } = {};

        media.forEach(m => mediaMap[m._id] = m.position);

        result.children = children.map(c => c.name);
        result.parent = item.container || null;
        result.description = item.description;
        result.location = item.position;
        result.type = item.type;

        result.recordings = recordings.map(r => {
            var series = r.series && seriesMap[r.series];

            return <IContainerRecording>{
                id: r._id,
                name: series ? `${series.hierarchicalName} ${seriesSeparator} ${r.name}` : r.name,
                position: mediaMap[r.media]
            };
        });

        result.recordings.sort((l, r) => l.name.localeCompare(r.name));
    });
}

export default Router()
    .get('/:id', async (req: Request, res: Response) => sendJson(res, await findContainer(req.params["id"])));
