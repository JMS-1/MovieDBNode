import { TGetFilterArgs, TGetMethodArgs, TGetMethodResult, TGqlType } from '@jms-1/mongodb-graphql'

import * as entities from './entities'

import { LanguageCollection } from '../collections/language'

export type ILanguage = TGqlType<typeof entities.Language>

export type ILanguageFindArgs = TGetFilterArgs<typeof LanguageCollection, 'find'>
export type ILanguageFindResult = TGetMethodResult<typeof LanguageCollection, 'find'>

export type ILanguageFindOneArgs = TGetMethodArgs<typeof LanguageCollection, 'findOne'>
export type ILanguageFindOneResult = TGetMethodResult<typeof LanguageCollection, 'findOne'>

export type ILanguageAddArgs = TGetMethodArgs<typeof LanguageCollection, 'add'>
export type ILanguageAddResult = TGetMethodResult<typeof LanguageCollection, 'add'>

export type ILanguageUpdateArgs = TGetMethodArgs<typeof LanguageCollection, 'update'>
export type ILanguageUpdateResult = TGetMethodResult<typeof LanguageCollection, 'update'>

export type ILanguageRemoveArgs = TGetMethodArgs<typeof LanguageCollection, 'remove'>
export type ILanguageRemoveResult = TGetMethodResult<typeof LanguageCollection, 'remove'>
