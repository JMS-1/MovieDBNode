"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const utils_1 = require("./utils");
const media_1 = require("../database/media");
exports.mediaApi = express_1.Router().use('/media', express_1.Router().get('/', (request, response, next) => utils_1.processApiRequest(async () => {
    const media = await media_1.mediaCollection.query();
    return {
        media: media.map(media_1.toProtocol),
    };
}, request, response)));

//# sourceMappingURL=media.js.map
