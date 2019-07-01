"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uuid_1 = require("uuid");
const utils_1 = require("./utils");
const language_1 = require("../database/language");
exports.languageApi = express_1.Router().use('/language', express_1.Router()
    .get('/', (request, response, next) => utils_1.processApiRequest(async () => {
    const languages = await language_1.languageCollection.find();
    return {
        languages: languages.map(language_1.toProtocol),
    };
}, request, response))
    .put('/:id', (request, response, next) => utils_1.processApiRequest(async (req) => {
    const language = language_1.toEntity(req, request.params.id);
    return {
        language: language_1.toProtocol(language),
        errors: await language_1.languageCollection.findOneAndReplace(language),
    };
}, request, response))
    .post('/', (request, response, next) => utils_1.processApiRequest(async (req) => {
    const language = language_1.toEntity(req, uuid_1.v4());
    return {
        language: language_1.toProtocol(language),
        errors: await language_1.languageCollection.insertOne(language),
    };
}, request, response)));

//# sourceMappingURL=language.js.map
