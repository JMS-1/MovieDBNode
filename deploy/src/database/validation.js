"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const djv = require("djv");
const validation = new djv();
function addSchema(schema) {
    function errorHandler(errorType) {
        let scope = schema;
        const props = [];
        for (let prop of this.data.slice(1)) {
            const testProp = /^\[decodeURIComponent\(['"]([^'"]+)['"]\)\]$/.exec(prop);
            const isProp = testProp && testProp[1];
            if (isProp) {
                props.push(`"${isProp}"`);
                scope = (scope.properties || (scope.items && scope.items.properties) || {})[isProp] || {};
            }
            else {
                const testIndex = /^\[(i\d+)\]$/.exec(prop);
                if (testIndex && props.length > 0) {
                    props[props.length - 1] += `+"["+${testIndex[1]}+"]"`;
                }
            }
        }
        const command = `{
            errors.push({
                constraint: "${errorType}",
                property: ${props.join("+'.'+") || "'*'"},
                message: "${scope.message || ''}"
            }); }`;
        return command;
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