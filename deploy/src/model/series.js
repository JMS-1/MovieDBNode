"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Series = void 0;
const types_1 = require("@jms-1/mongodb-graphql/lib/types");
const utils_1 = require("./utils");
exports.Series = (0, types_1.GqlObject)('Series', {
    _id: (0, types_1.GqlId)({ computed: true, description: 'Automatisch vergebene eindeutige Kennung der Serie.' }),
    description: (0, types_1.GqlNullable)((0, types_1.GqlString)({
        description: 'Optional eine Beschreibung für die Serie.',
        validation: {
            max: 2000,
            type: 'string',
        },
    })),
    fullName: (0, types_1.GqlNullable)((0, types_1.GqlString)({
        computed: true,
        description: 'Der berechnete vollständige Name für die Serie.',
        sortable: true,
        validation: {
            type: 'string',
        },
    })),
    name: (0, types_1.GqlString)({
        description: 'Der Anzeigetext für die Serie.',
        sortable: true,
        validation: {
            max: 50,
            min: 1,
            type: 'string',
        },
    }),
    parentId: (0, types_1.GqlNullable)((0, types_1.GqlString)({
        description: 'Optional die eindeutige Kennung der übergeordneten Serie.',
        validation: {
            pattern: utils_1.uniqueIdPattern,
            type: 'string',
        },
    })),
}, { description: 'Beschreibt eine Serie.' });
//# sourceMappingURL=series.js.map