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
            anyRent: '(verliehen egal)',
            clear: 'Neue Suche',
            count: '{count} von {total}',
            created: 'Erstellt',
            edit: {
                _id: 'Eindeutige Kennung',
                containerId: 'Ablage',
                containerPosition: 'Standort',
                containerType: 'Art der Ablage',
                created: 'Erstellt',
                description: 'Beschreibung',
                genres: 'Kategorien',
                languages: 'Sprachen',
                links: 'Verweise',
                name: 'Name',
                rentTo: 'Verliehen an',
                series: 'Serie',
            },
            genres: 'Kategorien',
            languages: 'Sprachen',
            name: 'Name',
            noRent: 'nicht verliehen',
            saveAndBack: 'Speichern und zurück',
            yesRent: 'verliehen',
        },
        routes: {
            container: 'Ablagen',
            recording: 'Aufzeichnungen',
        },
        save: 'Speichern',
        search: 'Suche...',
        series: {
            noSelect: '(alle Serien)',
        },
        validationError: 'Bitte Eingaben kontrollieren',
        webError: 'Server-Zugriff fehlgeschlagen',
    }
}
