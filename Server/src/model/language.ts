import { GqlId, GqlObject, GqlString } from '@jms-1/mongodb-graphql/lib/types'

export const Language = GqlObject(
    'Language',
    {
        _id: GqlId({ computed: true, description: 'Automatisch vergebene eindeutige Kennung der Sprache.' }),
        name: GqlString({
            description: 'Der Anzeigetext für die Sprache.', sortable: true, validation: {
                maxLength: 100,
                message: { de: 'Name nicht angegeben oder zu lang' },
                minLength: 1,
                type: 'string',
            },
        }),

    },
    { description: 'Beschreibt ein Buch.' },
)
