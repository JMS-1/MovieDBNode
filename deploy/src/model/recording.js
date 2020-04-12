"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const types = __importStar(require("@jms-1/mongodb-graphql/lib/types"));
const utils_1 = require("./utils");
var TRecordingContainerType;
(function (TRecordingContainerType) {
    TRecordingContainerType[TRecordingContainerType["BluRay"] = 5] = "BluRay";
    TRecordingContainerType[TRecordingContainerType["DVD"] = 4] = "DVD";
    TRecordingContainerType[TRecordingContainerType["RecordedDVD"] = 3] = "RecordedDVD";
    TRecordingContainerType[TRecordingContainerType["SuperVideoCD"] = 2] = "SuperVideoCD";
    TRecordingContainerType[TRecordingContainerType["Undefined"] = 0] = "Undefined";
    TRecordingContainerType[TRecordingContainerType["VideoCD"] = 1] = "VideoCD";
})(TRecordingContainerType = exports.TRecordingContainerType || (exports.TRecordingContainerType = {}));
exports.RecordingContainerType = types.GqlEnum('RecordingContainerType', TRecordingContainerType, {
    description: 'Ablageart einer Aufzeichnung.',
    sortable: true,
});
exports.Link = types.GqlObject('Link', {
    description: types.GqlNullable(types.GqlString({
        description: 'Optional eine Beschreibung des Verweises.',
        validation: {
            maxLength: 2000,
            type: 'string',
        },
    })),
    name: types.GqlString({
        description: 'Der Anzeigetext für den Verweise.',
        validation: {
            maxLength: 100,
            minLength: 1,
            type: 'string',
        },
    }),
    url: types.GqlString({
        description: 'Der eigentliche Verweis.',
        validation: {
            maxLength: 2000,
            minLength: 1,
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
            maxLength: 100,
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
            maxLength: 2000,
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
            maxLength: 100,
            minLength: 1,
            type: 'string',
        },
    }),
    rentTo: types.GqlNullable(types.GqlString({
        description: 'Optional an wen die Aufzeichnung verliehen ist.',
        sortable: true,
        validation: {
            maxLength: 200,
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

//# sourceMappingURL=recording.js.map
