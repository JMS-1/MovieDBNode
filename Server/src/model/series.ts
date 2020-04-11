import { GqlId, GqlNullable, GqlObject, GqlString } from '@jms-1/mongodb-graphql/lib/types'

import { uniqueIdPattern } from './utils'

export const Series = GqlObject(
    'Series',
    {
        _id: GqlId({ computed: true, description: 'Automatisch vergebene eindeutige Kennung der Serie.' }),
        fullName: GqlNullable(GqlString({
            description: 'Der berechnete vollständige Name für die Serie.',
            sortable: true,
            computed: true,
            validation: {
                type: 'string',
            },
        })),
        name: GqlString({
            description: 'Der Anzeigetext für die Serie.', sortable: true, validation: {
                maxLength: 50,
                message: { de: 'Name nicht angegeben oder zu lang' },
                minLength: 1,
                type: 'string',
            },
        }),
        description: GqlNullable(GqlString({
            description: 'Optional eine Beschreibung für die Serie.', sortable: true, validation: {
                maxLength: 2000,
                message: { de: 'Beschreibung ist zu lang' },
                type: 'string',
            },
        })),
        parentId: GqlNullable(GqlString({
            description: 'Optional die eindeutige Kennung der übergeordneten Serie.', validation: {
                message: { de: 'Eindeutige Kennung erwartet' },
                pattern: uniqueIdPattern,
                type: 'string',
            },
        })),

    },
    { description: 'Beschreibt eine Serie.' },
)
