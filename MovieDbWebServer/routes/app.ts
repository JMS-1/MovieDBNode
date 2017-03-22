import { Db } from 'mongodb';
import { Router, Request, Response } from 'express';

import { ApplicationInformation, IUnique, IName, IUniqueLanguage, IUniqueGenre, IUniqueContainer, ISeriesDescription, getSeries, seriesSeparator, urlMatcher, sendJson } from './protocol';

import { sharedConnection } from '../database/db';
import { languageCollection, ILanguage, genreCollection, IGenre, containerCollection, IContainer, recordingCollection } from '../database/model';

async function getNamedItems<TResultType extends IUnique & IName>(db: Db, collectionName: string): Promise<TResultType[]> {
    var raw = await db.collection(collectionName).find<ILanguage>().toArray();
    var all = raw.map(l => <TResultType>{ id: l._id, name: l.name });

    all.sort((l, r) => l.name.localeCompare(r.name));

    return new Promise<TResultType[]>(setResult => setResult(all));
}

async function getCount(db: Db): Promise<number> {
    var allCollections = await db.collections();

    for (var collection of allCollections)
        if (collection.collectionName === recordingCollection)
            return collection.count({});

    return new Promise<number>(setResult => setResult(null));
}

async function getInfo(): Promise<ApplicationInformation> {
    var allSeries = await getSeries();

    var database = await sharedConnection;

    var allContainers = await getNamedItems<IUniqueContainer>(database, containerCollection);
    var allLanguages = await getNamedItems<IUniqueLanguage>(database, languageCollection);
    var allGenres = await getNamedItems<IUniqueGenre>(database, genreCollection);
    var total = await getCount(database);

    return new Promise<ApplicationInformation>(setResult =>
        setResult({
            total: total || 0,
            genres: allGenres,
            series: allSeries,
            empty: total === null,
            languages: allLanguages,
            containers: allContainers,
            urlExpression: urlMatcher.source,
            seriesSeparator: seriesSeparator,
        }));
}

export default Router()
    .get('/info', async (req: Request, res: Response) => sendJson(res, await getInfo()));