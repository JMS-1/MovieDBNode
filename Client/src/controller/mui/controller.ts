import { containerType, mediaType } from 'movie-db-api'
import { IMuiState } from 'movie-db-client'

export function getInitialState(): IMuiState {
    return {
        cancel: 'Abbrechen',
        confirm: 'Bestätigung erforderlich',
        container: {
            confirmHtml: `
                Das Löschen einer Ablage kann <b>nicht</b>
                rückgängig gemacht werden. Soll die Ablage
                wirklick endgültig entfernt werden?
                `,
            edit: {
                _id: 'Eindeutige Kennung',
                description: 'Beschreibung',
                name: 'Name',
                parentId: 'Übergeordnete Ablage',
                parentLocation: 'Position in der übergeordneten Ablage',
                type: 'Art der Ablage',
            },
            name: 'Aufzeichnung',
            noId: '(noch keine)',
            noParent: '(keine)',
            position: 'Position',
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
            confirmHtml: `
                Das Löschen einer Kategorie kann <b>nicht</b>
                rückgängig gemacht werden. Soll die Kategorie
                wirklick endgültig entfernt werden?
                `,
            edit: {
                _id: 'Eindeutige Kennung',
                name: 'Kategorie',
            },
            noId: '(noch keine)',
            noSelect: '(alle Kategorien)',
        },
        language: {
            confirmHtml: `
                Das Löschen einer Sprache kann <b>nicht</b>
                rückgängig gemacht werden. Soll die Sprache
                wirklick endgültig entfernt werden?
                `,
            edit: {
                _id: 'Eindeutige Kennung',
                name: 'Sprache',
            },
            noId: '(noch keine)',
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
        no: 'Nein',
        recording: {
            anyRent: '(verliehen egal)',
            clear: 'Neue Suche',
            confirmHtml: `
                Das Löschen einer Aufzeichung kann <b>nicht</b>
                rückgängig gemacht werden. Soll die Aufzeichung
                wirklick endgültig entfernt werden?
                `,
            count: '{count} von {total}',
            createCopy: 'Kopie erstellen',
            created: 'Erstellt',
            edit: {
                _id: 'Eindeutige Kennung',
                containerId: 'Ablage',
                containerPosition: 'Standort',
                containerType: 'Art der Ablage',
                created: 'Erstellt',
                description: 'Beschreibung',
                fullName: 'Hierarchischer Name',
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
            export: 'Exportieren',
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
            saveAndCopy: 'Speichern und neue Kopie',
            yesRent: 'verliehen',
        },
        reset: 'Abbrechen',
        remove: 'Löschen',
        routes: {
            container: 'Ablagen',
            create: {
                container: 'Ablage erstellen',
                genre: 'Kategorie hinzufügen',
                language: 'Sprache hinzufügen',
                recording: 'Aufzeichnung erstellen',
                series: 'Serie erstellen',
                title: 'Neu',
            },
            genre: 'Kategorien',
            language: 'Sprachen',
            recording: 'Aufzeichnungen',
            series: 'Serien',
        },
        save: 'Speichern',
        search: 'Suche...',
        series: {
            confirmHtml: `
                Das Löschen einer Serie kann <b>nicht</b>
                rückgängig gemacht werden. Soll die Serie
                wirklick endgültig entfernt werden?
                `,
            edit: {
                _id: 'Eindeutige Kennung',
                description: 'Beschreibung',
                fullName: 'Hierarchischer Name',
                name: 'Name',
                parentId: 'Übergeordnete Serie',
            },
            noId: '(noch keine)',
            noParent: '(keine)',
            noSelect: '(alle Serien)',
        },
        validationError: 'Bitte Eingaben kontrollieren',
        webError: 'Server-Zugriff fehlgeschlagen',
        yes: 'Ja',
    }
}
