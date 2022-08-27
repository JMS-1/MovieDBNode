/* eslint-disable @typescript-eslint/naming-convention */

import { makeObservable, observable } from 'mobx'
import { SemanticICONS } from 'semantic-ui-react'

import { RootStore } from './root'

import { TRecordingContainerType } from '../../../Server/src/model/enum'

export class TranslationStore {
    constructor(public readonly root: RootStore) {
        makeObservable(this, { strings: observable })
    }

    strings = {
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
                Box: {
                    icon: 'zip' as SemanticICONS,
                    title: 'Große DVD Box',
                },
                Disk: {
                    icon: 'hdd' as SemanticICONS,
                    title: '(Externe) Festplatte',
                },
                FeatureSet: {
                    icon: 'briefcase' as SemanticICONS,
                    title: 'Kleine DVD Box',
                },
                Folder: {
                    icon: 'folder' as SemanticICONS,
                    title: 'Dateiverzeichnis',
                },
                Shelf: {
                    icon: 'building' as SemanticICONS,
                    title: 'Regal(fach)',
                },
                Undefined: {
                    icon: 'help' as SemanticICONS,
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
                [TRecordingContainerType.BluRay]: 'Blu-Ray',
                [TRecordingContainerType.DVD]: 'Gekaufte DVD',
                [TRecordingContainerType.RecordedDVD]: 'Selbstaufgenommene DVD',
                [TRecordingContainerType.SuperVideoCD]: 'Super-Video CD',
                [TRecordingContainerType.Undefined]: '(Unbekannt)',
                [TRecordingContainerType.VideoCD]: 'Video CD',
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
        remove: 'Löschen',
        reset: 'Verwerfen',
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
        themes: {
            default: 'Standard',
            theme1: 'Alternative 1',
            theme2: 'Alternative 2',
            title: 'Theme',
        },
        validationError: 'Bitte Eingaben kontrollieren',
        webError: 'Server-Zugriff fehlgeschlagen',
        yes: 'Ja',
    }
}
