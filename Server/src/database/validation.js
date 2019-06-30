"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const djv = require("djv");
const propReg = /^\[decodeURIComponent\(['"]([^'"]+)['"]\)\]$/;
const validation = new djv();
function addSchema(schema) {
    function errorHandler(errorType) {
        let scope = schema;
        const props = [];
        for (let prop of this.data.slice(1)) {
            const match = propReg.exec(prop);
            const found = match && match[1];
            if (found) {
                props.push(found);
                scope = (scope.properties || (scope.items && scope.items.properties) || {})[found] || {};
            }
        }
        return `{ errors.push({ constraint: "${errorType}", property: "${props.join('.') ||
            '*'}", message: "${scope.message || ''}" }); }`;
    }
    validation.setErrorHandler(errorHandler);
    validation.addSchema(schema.$id, schema);
    validation.setErrorHandler(undefined);
}
exports.addSchema = addSchema;
function validate(object, schema) {
    try {
        return validation.validate(schema.$id, object);
    }
    catch (error) {
        return [
            {
                constraint: 'validator',
                message: typeof error === 'string' ? error : error.message || 'failed',
                property: '*',
            },
        ];
    }
}
exports.validate = validate;

//# sourceMappingURL=validation.js.map
