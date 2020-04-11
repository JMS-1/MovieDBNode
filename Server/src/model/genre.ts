
import { GqlId, GqlObject, GqlString } from '@jms-1/mongodb-graphql/lib/types'

export const Genre = GqlObject(
    'Genre',
    {
        _id: GqlId({ computed: true, description: 'Automatisch vergebene eindeutige Kennung das Genre.' }),
        name: GqlString({
            description: 'Der Anzeigetext für das Genre.', sortable: true, validation: {
                maxLength: 100,
                minLength: 1,
                type: 'string',
            },
        }),

    },
    { description: 'Beschreibt ein Genre.' },
)
