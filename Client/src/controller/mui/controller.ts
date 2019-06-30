import { containerType, mediaType } from 'movie-db-api'
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
            noId: '(noch keine)',
            noParent: '(keine)',
            types: {
                [containerType.Box]: {
                    icon: 'zip',
                    title: 'Große DVD Box',
                },
                [containerType.Disk]: {
                    icon: 'hdd',
                    title: '(Externe) Festplatte',
                },
                [containerType.FeatureSet]: {
                    icon: 'briefcase',
                    title: 'Kleine DVD Box',
                },
                [containerType.Folder]: {
                    icon: 'folder',
                    title: 'Dateiverzeichnis',
                },
                [containerType.Shelf]: {
                    icon: 'building',
                    title: 'Regal(fach)',
                },
                [containerType.Undefined]: {
                    icon: 'help',
                    title: '(unbekannt)',
                },
            },
        },
        create: 'Neu anlegen',
        genre: {
            noSelect: '(alle Kategorien)',
        },
        language: {
            noSelect: '(alle Sprachen)',
        },
        media: {
            types: {
                [mediaType.BluRay]: 'Blu-Ray',
                [mediaType.DVD]: 'Gekaufte DVD',
                [mediaType.RecordedDVD]: 'Selbstaufgenommene DVD',
                [mediaType.SuperVideoCD]: 'Super-Video CD',
                [mediaType.Undefined]: '(Unbekannt)',
                [mediaType.VideoCD]: 'Video CD',
            },
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
            editContainer: '(Ablage zuordnen)',
            editGenres: '(Kategorien zuordnen)',
            editLanguages: '(Sprachen zuordnen)',
            editSeries: '(Serie zuordnen)',
            editType: '(Ablageart auswählen)',
            genres: 'Kategorien',
            languages: 'Sprachen',
            linkEdit: {
                description: 'Beschreibug',
                name: 'Kurzname',
                url: 'Verweis',
            },
            name: 'Name',
            noId: '(noch keine)',
            noRent: 'nicht verliehen',
            saveAndBack: 'Speichern und zurück',
            yesRent: 'verliehen',
        },
        reset: 'Zurücksetzen',
        routes: {
            container: 'Ablagen',
            create: {
                container: 'Ablage erstellen',
                recording: 'Aufzeichnung erstellen',
                title: 'Neu',
            },
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
