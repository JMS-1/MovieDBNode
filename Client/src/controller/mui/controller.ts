import { IMuiState } from 'movie-db-client'

export function getInitialState(): IMuiState {
    return {
        container: {
            edit: {
                _id: 'Eindeutige Kennung',
                description: 'Beschreibung',
                name: 'Name',
                parentId: 'Übergeordnete Ablage',
                parentLocation: 'Position in der übergeordneten Ablage',
                type: 'Art der Ablage',
            },
            noParent: '(keine)',
        },
    }
}
