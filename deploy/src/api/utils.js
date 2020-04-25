"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isxs_tools_1 = require("@jms-1/isxs-tools");
const utils_1 = require("../utils");
function processApiRequest(processor, request, response) {
    function onError(error) {
        const message = isxs_tools_1.getMessage(error);
        try {
            response.write(message);
            response.sendStatus(400);
        }
        catch (error) {
            utils_1.apiError('unable to process %s: %s', request.originalUrl, message);
        }
    }
    try {
        const result = processor(request.body);
        const promise = result instanceof Promise ? result : Promise.resolve(result);
        promise
            .then((data) => {
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
