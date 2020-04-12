"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@jms-1/mongodb-graphql/lib/types");
exports.Language = types_1.GqlObject('Language', {
    _id: types_1.GqlId({ computed: true, description: 'Automatisch vergebene eindeutige Kennung der Sprache.' }),
    name: types_1.GqlString({
        description: 'Der Anzeigetext für die Sprache.', sortable: true, validation: {
            maxLength: 100,
            minLength: 1,
            type: 'string',
        },
    }),
}, { description: 'Beschreibt eine Sprache.' });

//# sourceMappingURL=language.js.map
