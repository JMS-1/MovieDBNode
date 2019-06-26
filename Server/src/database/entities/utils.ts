export const uniqueId = '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$'

export const isoDate = '^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$'

type KeysOf<T> = keyof T

export interface IFieldSchemaCommon {
    message?: string
}

export interface IObjectFieldSchema<TEntity> extends IFieldSchemaCommon {
    additionalProperties?: boolean
    properties: Required<{ [TField in KeysOf<TEntity>]: TFieldSchema<TEntity> }>
    required: KeysOf<TEntity>[]
    type: 'object'
}

export interface IStringArrayFieldSchema extends IFieldSchemaCommon {
    items: IStringFieldSchema
    type: 'array'
    uniqueItems?: boolean
}

export interface IObjectArrayFieldSchema extends IFieldSchemaCommon {
    items: IObjectFieldSchema<any>
    type: 'array'
    uniqueItems?: boolean
}

export interface IStringFieldSchema extends IFieldSchemaCommon {
    maxLength?: number
    minLength?: number
    pattern?: string
    type: 'string'
}

export interface IIntegerFieldSchema extends IFieldSchemaCommon {
    enum?: number[]
    minimum?: number
    type: 'integer'
}

export type TFieldSchema<TEntity> =
    | IIntegerFieldSchema
    | IObjectArrayFieldSchema
    | IObjectFieldSchema<TEntity>
    | IStringArrayFieldSchema
    | IStringFieldSchema

export interface ISchema<TEntity> extends IObjectFieldSchema<TEntity> {
    $id: string
    $schema: 'http://json-schema.org/schema#'
}
