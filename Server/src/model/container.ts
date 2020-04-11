import { GqlEnum, GqlId, GqlNullable, GqlObject, GqlString } from '@jms-1/mongodb-graphql/lib/types'

import { uniqueIdPattern } from './utils'

export enum TContainerType {
    Box = 2,
    Disk = 4,
    FeatureSet = 1,
    Folder = 5,
    Shelf = 3,
    Undefined = 0,
}

export const ContainerType = GqlEnum('ContainerType', TContainerType, {
    description: 'Die möglichen Arten von Ablagen.',
    sortable: true,
})

export const Container = GqlObject(
    'Container',
    {
        _id: GqlId({ computed: true, description: 'Automatisch vergebene eindeutige Kennung des Ablage.' }),
        type: ContainerType,
        name: GqlString({
            description: 'Der Anzeigetext für die Ablage.', sortable: true, validation: {
                maxLength: 50,
                message: { de: 'Name nicht angegeben oder zu lang' },
                minLength: 1,
                type: 'string',
            },
        }),
        description: GqlNullable(GqlString({
            description: 'Eine Beschreibung für die Ablage.', validation: {
                maxLength: 2000,
                message: { de: 'Beschreibung zu lang' },
                type: 'string',
            },
        })),
        parentId: GqlNullable(GqlString({
            description: 'Optional die eindeutige Kennung der übergeordneten Ablage.', validation: {
                message: { de: 'Eindeutige Kennung erwartet' },
                pattern: uniqueIdPattern,
                type: 'string',
            },
        })),
        parentLocation: GqlNullable(GqlString({
            description: 'Die Position der Ablage in der übergeordneten Ablage.', validation: {
                maxLength: 100,
                message: { de: 'Ablagebezeichnung zu lang' },
                type: 'string',
            },
        })),
    },
    { description: 'Beschreibt eine Ablage.' },
)
