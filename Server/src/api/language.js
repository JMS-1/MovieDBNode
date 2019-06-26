"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const utils_1 = require("./utils");
const language_1 = require("../database/language");
exports.languageApi = express_1.Router().use('/language', express_1.Router().get('/', (request, response, next) => utils_1.processApiRequest(async () => {
    const languages = await language_1.languageCollection.find();
    return {
        languages: languages.map(language_1.toProtocol),
    };
}, request, response)));

//# sourceMappingURL=language.js.map
