import * as types from '@jms-1/mongodb-graphql/lib/types'

import { uniqueIdPattern } from './utils'

export enum TRecordingContainerType {
    BluRay = 5,
    DVD = 4,
    RecordedDVD = 3,
    SuperVideoCD = 2,
    Undefined = 0,
    VideoCD = 1,
}

export const RecordingContainerType = types.GqlEnum('RecordingContainerType', TRecordingContainerType, {
    description: 'Ablageart einer Aufzeichnung.',
    sortable: true,
})

export const Link = types.GqlObject(
    'Link',
    {
        description: types.GqlNullable(
            types.GqlString({
                description: 'Optional eine Beschreibung des Verweises.',
                validation: {
                    maxLength: 2000,
                    type: 'string',
                },
            })
        ),
        name: types.GqlString({
            description: 'Der Anzeigetext für den Verweise.',
            validation: {
                maxLength: 100,
                minLength: 1,
                type: 'string',
            },
        }),
        url: types.GqlString({
            description: 'Der eigentliche Verweis.',
            validation: {
                maxLength: 2000,
                minLength: 1,
                type: 'string',
            },
        }),
    },
    { description: 'Beschreibt einen Verweis.' }
)

export const Recording = types.GqlObject(
    'Recording',
    {
        _id: types.GqlId({ computed: true, description: 'Automatisch vergebene eindeutige Kennung der Aufzeichnung.' }),
        containerId: types.GqlNullable(
            types.GqlString({
                description: 'Optional die Ablage in der die Aufzeichnung zu finden ist.',
                validation: {
                    pattern: uniqueIdPattern,
                    type: 'string',
                },
            })
        ),
        containerPosition: types.GqlNullable(
            types.GqlString({
                description: 'Optional der Standort der Aufzeichnung innerhalb der Ablage.',
                validation: {
                    maxLength: 100,
                    type: 'string',
                },
            })
        ),
        containerType: RecordingContainerType,
        created: types.GqlString({
            computed: true,
            description: 'Datum an dem die Aufzeichnung erzeugt wurde (ISO Notation).',
            sortable: true,
            validation: {
                type: 'string',
            },
        }),
        description: types.GqlNullable(
            types.GqlString({
                description: 'Optional eine Beschreibung für die Aufzeichnung.',
                validation: {
                    maxLength: 2000,
                    type: 'string',
                },
            })
        ),
        fullName: types.GqlString({
            computed: true,
            description: 'Der berechnete vollständige Name der Aufzeichnung.',
            sortable: true,
        }),
        genres: types.GqlArray(
            types.GqlString({
                description: 'Alle Kategorien der Aufzeichnung.',
                validation: {
                    pattern: uniqueIdPattern,
                    type: 'string',
                },
            })
        ),
        languages: types.GqlArray(
            types.GqlString({
                description: 'Alle Sprachen der Aufzeichnung.',
                validation: {
                    pattern: uniqueIdPattern,
                    type: 'string',
                },
            })
        ),
        links: types.GqlArray(Link),
        name: types.GqlString({
            description: 'Der Anzeigetext für die Aufzeichnung.',
            sortable: true,
            validation: {
                maxLength: 100,
                minLength: 1,
                type: 'string',
            },
        }),
        rentTo: types.GqlNullable(
            types.GqlString({
                description: 'Optional an wen die Aufzeichnung verliehen ist.',
                sortable: true,
                validation: {
                    maxLength: 200,
                    type: 'string',
                },
            })
        ),
        series: types.GqlNullable(
            types.GqlString({
                description: 'Optional die Serie zu der die Aufzeichnung gehört.',
                validation: {
                    pattern: uniqueIdPattern,
                    type: 'string',
                },
            })
        ),
    },
    { description: 'Beschreibt eine Aufzeichnung.' }
)
