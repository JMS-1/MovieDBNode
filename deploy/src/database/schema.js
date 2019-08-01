"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dataPropsMapper = {
    additionalProperties: copy,
    enum: copy,
    items: arrayElements,
    maxLength: copy,
    message: errorMessage,
    minLength: copy,
    pattern: copy,
    properties: subObject,
    required: copy,
    type: dataType,
    uniqueItems: copy,
};
const schemaPropsMapper = {
    $id: discard,
    $schema: discard,
    additionalProperties: copy,
    message: errorMessage,
    properties: subObject,
    required: copy,
    type: dataType,
};
function discard(value, target, prop) { }
function copy(value, target, prop) {
    target[prop] = value;
}
function dataType(value, target, prop) {
    switch (value) {
        case 'array':
        case 'object':
        case 'string':
            target.bsonType = value;
            break;
        case 'integer':
            target.bsonType = 'int';
            break;
        default:
            throw new Error(`unsupported data type '${value}'`);
    }
}
function errorMessage(value, target, prop) {
    target.description = value;
}
function subObject(value, target, prop) {
    target.properties = {};
    for (let prop in value) {
        if (value.hasOwnProperty(prop)) {
            target.properties[prop] = mapProperties(value[prop], dataPropsMapper);
        }
    }
}
function arrayElements(value, target, prop) {
    target.items = mapProperties(value, dataPropsMapper);
}
function mapProperties(object, mappers) {
    const mongo = {};
    for (let prop in object) {
        if (object.hasOwnProperty(prop)) {
            const mapper = mappers[prop];
            if (!mapper) {
                throw new Error(`can not map property '${prop}' to $jsonSchema`);
            }
            mapper(object[prop], mongo, prop);
        }
    }
    return mongo;
}
function convertToMongo(schema) {
    return mapProperties(schema, schemaPropsMapper);
}
exports.convertToMongo = convertToMongo;
//# sourceMappingURL=schema.js.map