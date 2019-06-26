import { containerType } from 'movie-db-api'
import { IMuiState } from 'movie-db-client'

export function getInitialState(): IMuiState {
    return {
        cancel: 'Abbrechen',
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
            types: {
                [containerType.Box]: {
                    icon: 'zip',
                    title: 'Große Box',
                },
                [containerType.Disk]: {
                    icon: 'hdd',
                    title: 'Festplatte',
                },
                [containerType.FeatureSet]: {
                    icon: 'briefcase',
                    title: 'Kleine Box',
                },
                [containerType.Folder]: {
                    icon: 'folder',
                    title: 'Dateiordner',
                },
                [containerType.Shelf]: {
                    icon: 'building',
                    title: 'Schrank',
                },
                [containerType.Undefined]: {
                    icon: 'help',
                    title: 'Unbekannt',
                },
            },
        },
        error: 'Bitte Eingaben kontrollieren',
        save: 'Speichern',
    }
}
