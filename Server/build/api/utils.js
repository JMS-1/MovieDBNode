"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("body-parser");
const debug = require("debug");
exports.apiError = debug('api');
function getError(error) {
    return typeof error === 'string' ? error : error.message || 'failed';
}
exports.getError = getError;
function processApiRequest(processor, request, response) {
    function onError(error) {
        const message = getError(error);
        try {
            response.write(message);
            response.sendStatus(400);
        }
        catch (error) {
            exports.apiError(message);
        }
    }
    try {
        const result = processor(request.body);
        const promise = result instanceof Promise ? result : Promise.resolve(result);
        promise
            .then(data => {
            try {
                response.header('Cache-Control', 'private, no-cache, no-store, must-revalidate').json(data);
            }
            catch (error) {
                onError(error);
            }
        }, onError)
            .catch(onError);
    }
    catch (error) {
        onError(error);
    }
}
exports.processApiRequest = processApiRequest;

//# sourceMappingURL=utils.js.map
