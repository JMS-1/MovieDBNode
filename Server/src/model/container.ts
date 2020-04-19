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
        description: GqlNullable(
            GqlString({
                description: 'Eine Beschreibung für die Ablage.',
                validation: {
                    max: 2000,
                    type: 'string',
                },
            })
        ),
        name: GqlString({
            description: 'Der Anzeigetext für die Ablage.',
            sortable: true,
            validation: {
                max: 50,
                min: 1,
                type: 'string',
            },
        }),
        parentId: GqlNullable(
            GqlString({
                description: 'Optional die eindeutige Kennung der übergeordneten Ablage.',
                validation: {
                    pattern: uniqueIdPattern,
                    type: 'string',
                },
            })
        ),
        parentLocation: GqlNullable(
            GqlString({
                description: 'Die Position der Ablage in der übergeordneten Ablage.',
                validation: {
                    max: 100,
                    type: 'string',
                },
            })
        ),
        type: ContainerType,
    },
    { description: 'Beschreibt eine Ablage.' }
)
