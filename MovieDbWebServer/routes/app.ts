import { Db } from 'mongodb';
import { Router, Request, Response } from 'express';

import { ApplicationInformation, ILanguageDescription, IGenreDescription, IContainerDescription, ISeriesDescription, seriesSeparator, urlMatcher, sendJson } from './protocol';

import { connect } from '../database/db';
import { languageCollection, ILanguage, genreCollection, IGenre, containerCollection, IContainer, seriesCollection, ISeries, recordingCollection } from '../database/model';

function getLanguages(db: Db): Promise<ILanguageDescription[]> {
    return new Promise<ILanguageDescription[]>(setResult => {
        var languages: ILanguageDescription[] = [];

        db
            .collection(languageCollection)
            .find<ILanguage>({})
            .sort({ name: 1 })
            .forEach(l => languages.push({ id: l._id, name: l.name }), () => {
                setResult(languages);
            });
    });
}

function getGenres(db: Db): Promise<IGenreDescription[]> {
    return new Promise<IGenreDescription[]>(setResult => {
        var genres: IGenreDescription[] = [];

        db
            .collection(genreCollection)
            .find<IGenre>({})
            .sort({ name: 1 })
            .forEach(g => genres.push({ id: g._id, name: g.name }), () => setResult(genres));
    });
}

function getContainers(db: Db): Promise<IContainerDescription[]> {
    return new Promise<IContainerDescription[]>(setResult => {
        var containers: IContainerDescription[] = [];

        db
            .collection(containerCollection)
            .find<IContainer>({})
            .sort({ name: 1 })
            .forEach(c => containers.push({ id: c._id, name: c.name }), () => setResult(containers));
    });
}

function getSeries(db: Db): Promise<ISeriesDescription[]> {
    return new Promise<ISeriesDescription[]>(setResult => {
        var series: ISeriesDescription[] = [];

        db
            .collection(seriesCollection)
            .find<ISeries>({})
            .forEach(s => series.push({ id: s._id, name: s.name, parentId: (s.series === null) ? null : `${s.series}`, hierarchicalName: s.name }), () => {
                var map: { [id: string]: ISeriesDescription } = {}

                series.forEach(s => map[s.id] = s);
                series.forEach(s => {
                    for (var t = s; t.parentId;) {
                        t = map[t.parentId];

                        s.hierarchicalName = `${t.name} ${seriesSeparator} ${s.hierarchicalName}`;
                    }
                });

                series.sort((l, r) => l.hierarchicalName.localeCompare(r.hierarchicalName));

                setResult(series);
            });
    });
}

async function getCount(db: Db): Promise<number> {
    var allCollections = await db.collections();

    for (var collection of allCollections)
        if (collection.collectionName === recordingCollection)
            return collection.count({});

    return new Promise<number>(setResult => setResult(null));
}

async function getInfo(): Promise<ApplicationInformation> {
    var database = await connect();

    var allContainers = await getContainers(database);
    var allLanguages = await getLanguages(database);
    var allGenres = await getGenres(database);
    var allSeries = await getSeries(database);
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