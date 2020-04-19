"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@jms-1/mongodb-graphql/lib/types");
const utils_1 = require("./utils");
var TContainerType;
(function (TContainerType) {
    TContainerType[TContainerType["Box"] = 2] = "Box";
    TContainerType[TContainerType["Disk"] = 4] = "Disk";
    TContainerType[TContainerType["FeatureSet"] = 1] = "FeatureSet";
    TContainerType[TContainerType["Folder"] = 5] = "Folder";
    TContainerType[TContainerType["Shelf"] = 3] = "Shelf";
    TContainerType[TContainerType["Undefined"] = 0] = "Undefined";
})(TContainerType = exports.TContainerType || (exports.TContainerType = {}));
exports.ContainerType = types_1.GqlEnum('ContainerType', TContainerType, {
    description: 'Die möglichen Arten von Ablagen.',
    sortable: true,
});
exports.Container = types_1.GqlObject('Container', {
    _id: types_1.GqlId({ computed: true, description: 'Automatisch vergebene eindeutige Kennung des Ablage.' }),
    description: types_1.GqlNullable(types_1.GqlString({
        description: 'Eine Beschreibung für die Ablage.',
        validation: {
            max: 2000,
            type: 'string',
        },
    })),
    name: types_1.GqlString({
        description: 'Der Anzeigetext für die Ablage.',
        sortable: true,
        validation: {
            max: 50,
            min: 1,
            type: 'string',
        },
    }),
    parentId: types_1.GqlNullable(types_1.GqlString({
        description: 'Optional die eindeutige Kennung der übergeordneten Ablage.',
        validation: {
            pattern: utils_1.uniqueIdPattern,
            type: 'string',
        },
    })),
    parentLocation: types_1.GqlNullable(types_1.GqlString({
        description: 'Die Position der Ablage in der übergeordneten Ablage.',
        validation: {
            max: 100,
            type: 'string',
        },
    })),
    type: exports.ContainerType,
}, { description: 'Beschreibt eine Ablage.' });

//# sourceMappingURL=container.js.map
