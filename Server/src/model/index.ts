import { TGetFilterArgs, TGetMethodArgs, TGetMethodResult, TGqlType } from '@jms-1/mongodb-graphql'

import * as entities from './entities'

import { GenreCollection } from '../collections/genre'
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

export type IGenre = TGqlType<typeof entities.Genre>

export type IGenreFindArgs = TGetFilterArgs<typeof GenreCollection, 'find'>
export type IGenreFindResult = TGetMethodResult<typeof GenreCollection, 'find'>

export type IGenreFindOneArgs = TGetMethodArgs<typeof GenreCollection, 'findOne'>
export type IGenreFindOneResult = TGetMethodResult<typeof GenreCollection, 'findOne'>

export type IGenreAddArgs = TGetMethodArgs<typeof GenreCollection, 'add'>
export type IGenreAddResult = TGetMethodResult<typeof GenreCollection, 'add'>

export type IGenreUpdateArgs = TGetMethodArgs<typeof GenreCollection, 'update'>
export type IGenreUpdateResult = TGetMethodResult<typeof GenreCollection, 'update'>

export type IGenreRemoveArgs = TGetMethodArgs<typeof GenreCollection, 'remove'>
export type IGenreRemoveResult = TGetMethodResult<typeof GenreCollection, 'remove'>
