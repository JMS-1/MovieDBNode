"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordingQueryResponse = exports.QueryCountInfo = exports.RecordingSort = exports.Recording = exports.Link = exports.RecordingContainerType = void 0;
const types = __importStar(require("@jms-1/mongodb-graphql/lib/types"));
const enum_1 = require("./enum");
const utils_1 = require("./utils");
exports.RecordingContainerType = types.GqlEnum('RecordingContainerType', enum_1.TRecordingContainerType, {
    description: 'Ablageart einer Aufzeichnung.',
    sortable: true,
});
exports.Link = types.GqlObject('Link', {
    description: types.GqlNullable(types.GqlString({
        description: 'Optional eine Beschreibung des Verweises.',
        validation: {
            max: 2000,
            type: 'string',
        },
    })),
    name: types.GqlString({
        description: 'Der Anzeigetext für den Verweise.',
        validation: {
            max: 100,
            min: 1,
            type: 'string',
        },
    }),
    url: types.GqlString({
        description: 'Der eigentliche Verweis.',
        validation: {
            max: 2000,
            min: 1,
            type: 'string',
        },
    }),
}, { description: 'Beschreibt einen Verweis.' });
exports.Recording = types.GqlObject('Recording', {
    _id: types.GqlId({ computed: true, description: 'Automatisch vergebene eindeutige Kennung der Aufzeichnung.' }),
    containerId: types.GqlNullable(types.GqlString({
        description: 'Optional die Ablage in der die Aufzeichnung zu finden ist.',
        validation: {
            pattern: utils_1.uniqueIdPattern,
            type: 'string',
        },
    })),
    containerPosition: types.GqlNullable(types.GqlString({
        description: 'Optional der Standort der Aufzeichnung innerhalb der Ablage.',
        validation: {
            max: 100,
            type: 'string',
        },
    })),
    containerType: exports.RecordingContainerType,
    created: types.GqlString({
        computed: true,
        description: 'Datum an dem die Aufzeichnung erzeugt wurde (ISO Notation).',
        sortable: true,
        validation: {
            type: 'string',
        },
    }),
    description: types.GqlNullable(types.GqlString({
        description: 'Optional eine Beschreibung für die Aufzeichnung.',
        validation: {
            max: 2000,
            type: 'string',
        },
    })),
    fullName: types.GqlString({
        computed: true,
        description: 'Der berechnete vollständige Name der Aufzeichnung.',
        sortable: true,
    }),
    genres: types.GqlArray(types.GqlString({
        description: 'Alle Kategorien der Aufzeichnung.',
        validation: {
            pattern: utils_1.uniqueIdPattern,
            type: 'string',
        },
    })),
    languages: types.GqlArray(types.GqlString({
        description: 'Alle Sprachen der Aufzeichnung.',
        validation: {
            pattern: utils_1.uniqueIdPattern,
            type: 'string',
        },
    })),
    links: types.GqlArray(exports.Link),
    name: types.GqlString({
        description: 'Der Anzeigetext für die Aufzeichnung.',
        sortable: true,
        validation: {
            max: 100,
            min: 1,
            type: 'string',
        },
    }),
    rentTo: types.GqlNullable(types.GqlString({
        description: 'Optional an wen die Aufzeichnung verliehen ist.',
        sortable: true,
        validation: {
            max: 200,
            type: 'string',
        },
    })),
    series: types.GqlNullable(types.GqlString({
        description: 'Optional die Serie zu der die Aufzeichnung gehört.',
        validation: {
            pattern: utils_1.uniqueIdPattern,
            type: 'string',
        },
    })),
}, { description: 'Beschreibt eine Aufzeichnung.' });
exports.RecordingSort = types.GqlEnum('RecordingSort', enum_1.TRecordingSort, {
    description: 'Eigenschaften, nach denen die Aufzeichnungen sortiert werden können.',
});
exports.QueryCountInfo = types.GqlObject('QueryCountInfo', {
    _id: types.GqlId({ description: 'Die eindeutige Kennung des Kriteriums.' }),
    count: types.GqlInt({ description: 'Die Anzahl der Aufzeichnungen für das Kriterium.' }),
}, { description: 'Beschreibt die Anzahl von Aufzeichnungen für ein bestimmtes Kriterium.' });
exports.RecordingQueryResponse = types.GqlObject('RecordingQueryResponse', {
    correlationId: types.GqlNullable(types.GqlId({ description: 'Eindeutige Kennung des zugehörigen Aufrufs.' })),
    count: types.GqlInt({
        description: 'Die Anzahl der Aufzeichnungen bezüglich der vorgegebenen Einschränkungen.',
    }),
    genres: types.GqlArray(exports.QueryCountInfo, {
        description: 'Statistik über die Anzahl der Aufzeichnungen pro Kategorie.',
    }),
    languages: types.GqlArray(exports.QueryCountInfo, {
        description: 'Statistik über die Anzahl der Aufzeichnungen pro Sprache.',
    }),
    total: types.GqlInt({ description: 'Die gesamte Anzahl an Aufzeichnungen.' }),
    view: types.GqlArray(exports.Recording, { description: 'Das zu den Ergebnissen passende Fenster von Aufzeichnungen.' }),
}, { description: 'Ergebnis einer freien Suche nach Aufzeichnungen.' });

//# sourceMappingURL=recording.js.map
