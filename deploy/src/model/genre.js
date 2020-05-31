"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Genre = void 0;
const types_1 = require("@jms-1/mongodb-graphql/lib/types");
exports.Genre = types_1.GqlObject('Genre', {
    _id: types_1.GqlId({ computed: true, description: 'Automatisch vergebene eindeutige Kennung der Kategorie.' }),
    name: types_1.GqlString({
        description: 'Der Anzeigetext für die Kategorie.',
        sortable: true,
        validation: {
            max: 100,
            min: 1,
            type: 'string',
        },
    }),
}, { description: 'Beschreibt eine Kategorie.' });

//# sourceMappingURL=genre.js.map
