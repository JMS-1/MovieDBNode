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
        genre: {
            noSelect: '(alle Kategorien)',
        },
        language: {
            noSelect: '(alle Sprachen)',
        },
        recording: {
            anyRent: '(Verleih egal)',
            created: 'Erstellt',
            genres: 'Kategorien',
            languages: 'Sprachen',
            name: 'Name',
            noRent: 'nicht verliehen',
            yesRent: 'verliehen',
        },
        routes: {
            container: 'Ablagen',
            recording: 'Aufzeichnungen',
        },
        save: 'Speichern',
        search: 'Suche...',
        validationError: 'Bitte Eingaben kontrollieren',
        webError: 'Server-Zugriff fehlgeschlagen',
    }
}
