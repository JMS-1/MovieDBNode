import { Db } from 'mongodb';
import { Router, Request, Response } from 'express';

import { ApplicationInformation, ILanguageDescription, IGenreDescription, IContainerDescription, ISeriesDescription, seriesSeparator, sendJson } from './protocol';

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

function getCount(db: Db): Promise<number> {
    return new Promise<number>(setResult => {
        db.collections().then(allCollections => {
            for (var collection of allCollections)
                if (collection.collectionName === recordingCollection) {
                    collection.count({}).then(setResult);

                    return;
                }

            setResult(null);
        });
    });
}

function getInfo(): Promise<ApplicationInformation> {
    return new Promise<ApplicationInformation>(setResult => connect().then(database => {
        getLanguages(database).then(allLanguages =>
            getGenres(database).then(allGenres => {
                getContainers(database).then(allContainers => {
                    getSeries(database).then(allSeries => {
                        getCount(database).then(total => {
                            setResult({
                                total: total || 0,
                                genres: allGenres,
                                series: allSeries,
                                empty: total === null,
                                languages: allLanguages,
                                containers: allContainers,
                                seriesSeparator: seriesSeparator,
                                urlExpression: "https?:\\/\\/(\\w+:{0,1}\\w*@)?(\\S+)(:[0-9]+)?(\\/|\\/([\\w#!:.?+=&%@!\\-\\/]))?"
                            });
                        });
                    });
                });
            }))
    }));
}

const router = Router();

router.get('/info', (req: Request, res: Response) => getInfo().then(info => sendJson(res, info)));

export default router;