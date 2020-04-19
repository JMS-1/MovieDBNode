import { GqlId, GqlObject, GqlString } from '@jms-1/mongodb-graphql/lib/types'

export const Genre = GqlObject(
    'Genre',
    {
        _id: GqlId({ computed: true, description: 'Automatisch vergebene eindeutige Kennung der Kategorie.' }),
        name: GqlString({
            description: 'Der Anzeigetext für die Kategorie.',
            sortable: true,
            validation: {
                max: 100,
                min: 1,
                type: 'string',
            },
        }),
    },
    { description: 'Beschreibt eine Kategorie.' }
)
