"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const language_1 = require("../database/language");
exports.languageApi = utils_1.createApiRouter('/language', language_1.languageCollection, language_1.toProtocol, language_1.toEntity);

//# sourceMappingURL=language.js.map
