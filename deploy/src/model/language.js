"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Language = void 0;
const types_1 = require("@jms-1/mongodb-graphql/lib/types");
exports.Language = (0, types_1.GqlObject)("Language", {
    _id: (0, types_1.GqlId)({
        computed: true,
        description: "Automatisch vergebene eindeutige Kennung der Sprache.",
    }),
    name: (0, types_1.GqlString)({
        description: "Der Anzeigetext für die Sprache.",
        sortable: true,
        validation: {
            max: 100,
            min: 1,
            type: "string",
        },
    }),
}, { description: "Beschreibt eine Sprache." });
//# sourceMappingURL=language.js.map