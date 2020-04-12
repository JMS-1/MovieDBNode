import { GqlId, GqlNullable, GqlObject, GqlString } from '@jms-1/mongodb-graphql/lib/types'

import { uniqueIdPattern } from './utils'

export const Series = GqlObject(
    'Series',
    {
        _id: GqlId({ computed: true, description: 'Automatisch vergebene eindeutige Kennung der Serie.' }),
        description: GqlNullable(
            GqlString({
                description: 'Optional eine Beschreibung für die Serie.',
                validation: {
                    maxLength: 2000,
                    type: 'string',
                },
            })
        ),
        fullName: GqlNullable(
            GqlString({
                computed: true,
                description: 'Der berechnete vollständige Name für die Serie.',
                sortable: true,
                validation: {
                    type: 'string',
                },
            })
        ),
        name: GqlString({
            description: 'Der Anzeigetext für die Serie.',
            sortable: true,
            validation: {
                maxLength: 50,
                minLength: 1,
                type: 'string',
            },
        }),
        parentId: GqlNullable(
            GqlString({
                description: 'Optional die eindeutige Kennung der übergeordneten Serie.',
                validation: {
                    pattern: uniqueIdPattern,
                    type: 'string',
                },
            })
        ),
    },
    { description: 'Beschreibt eine Serie.' }
)
