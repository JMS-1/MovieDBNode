"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = exports.ContainerType = void 0;
const types = __importStar(require("@jms-1/mongodb-graphql/lib/types"));
const enum_1 = require("./enum");
const utils_1 = require("./utils");
exports.ContainerType = types.GqlEnum("ContainerType", enum_1.TContainerType, {
    description: "Die möglichen Arten von Ablagen.",
    sortable: true,
});
exports.Container = types.GqlObject("Container", {
    _id: types.GqlId({
        computed: true,
        description: "Automatisch vergebene eindeutige Kennung des Ablage.",
    }),
    description: types.GqlNullable(types.GqlString({
        description: "Eine Beschreibung für die Ablage.",
        validation: {
            max: 2000,
            type: "string",
        },
    })),
    name: types.GqlString({
        description: "Der Anzeigetext für die Ablage.",
        sortable: true,
        validation: {
            max: 50,
            min: 1,
            type: "string",
        },
    }),
    parentId: types.GqlNullable(types.GqlString({
        description: "Optional die eindeutige Kennung der übergeordneten Ablage.",
        validation: {
            pattern: utils_1.uniqueIdPattern,
            type: "string",
        },
    })),
    parentLocation: types.GqlNullable(types.GqlString({
        description: "Die Position der Ablage in der übergeordneten Ablage.",
        validation: {
            max: 100,
            type: "string",
        },
    })),
    type: exports.ContainerType,
}, { description: "Beschreibt eine Ablage." });
//# sourceMappingURL=container.js.map