"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dataPropsMapper = {
    maxLength: copy,
    message: errorMessage,
    minLength: copy,
    pattern: copy,
    type: dataType,
};
const schemaPropsMapper = {
    $id: discard,
    $schema: discard,
    message: errorMessage,
    properties: recurse,
    required: copy,
    type: dataType,
};
function discard(value, target, prop) { }
function copy(value, target, prop) {
    target[prop] = value;
}
function dataType(value, target, prop) {
    switch (value) {
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
function recurse(value, target, prop) {
    target.properties = {};
    for (let prop in value) {
        if (value.hasOwnProperty(prop)) {
            target.properties[prop] = mapProperties(value[prop], dataPropsMapper);
        }
    }
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