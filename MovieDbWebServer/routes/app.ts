import { Db } from 'mongodb';
import { Router, Request, Response } from 'express';

import { ApplicationInformation, ILanguageDescription, IGenreDescription, IContainerDescription } from './protocol';

import { connect } from '../database/db';
import { languageCollection, ILanguage, genreCollection, IGenre, containerCollection, IContainer } from '../database/model';

function getLanguages(db: Db): Promise<ILanguageDescription[]> {
    return new Promise<ILanguageDescription[]>(setResult => {
        var languages: ILanguageDescription[] = [];

        db
            .collection(languageCollection)
            .find<ILanguage>({})
            .sort({ name: 1 })
            .forEach(l => languages.push({ id: `${l._id}`, name: l.name }), () => {
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
            .forEach(g => genres.push({ id: `${g._id}`, name: g.name }), () => {
                setResult(genres);
            });
    });
}

function getContainers(db: Db): Promise<IContainerDescription[]> {
    return new Promise<IContainerDescription[]>(setResult => {
        var containers: IContainerDescription[] = [];

        db
            .collection(containerCollection)
            .find<IContainer>({})
            .sort({ name: 1 })
            .forEach(c => containers.push({ id: `${c._id}`, name: c.name }), () => {
                setResult(containers);
            });
    });
}

function getInfo(): Promise<ApplicationInformation> {
    return new Promise<ApplicationInformation>(setResult => connect().then(database => {
        getLanguages(database).then(allLanguages =>
            getGenres(database).then(allGenres => {
                getContainers(database).then(allContainers => {
                    setResult({
                        total: 0,
                        series: [],
                        empty: false,
                        genres: allGenres,
                        seriesSeparator: ">",
                        languages: allLanguages,
                        containers: allContainers,
                        urlExpression: "https?:\\/\\/(\\w+:{0,1}\\w*@)?(\\S+)(:[0-9]+)?(\\/|\\/([\\w#!:.?+=&%@!\\-\\/]))?"
                    });
                });
            }))
    }));
}

const router = Router();

router.get('/info', (req: Request, res: Response) => {
    getInfo().then(info => {
        return res.json(info);
    });
});

export default router;