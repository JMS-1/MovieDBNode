import { GqlId, GqlObject, GqlString } from '@jms-1/mongodb-graphql/lib/types'

export const Language = GqlObject(
    'Language',
    {
        _id: GqlId({ computed: true, description: 'Automatisch vergebene eindeutige Kennung der Sprache.' }),
        name: GqlString({
            description: 'Der Anzeigetext für die Sprache.',
            sortable: true,
            validation: {
                maxLength: 100,
                minLength: 1,
                type: 'string',
            },
        }),
    },
    { description: 'Beschreibt eine Sprache.' }
)
