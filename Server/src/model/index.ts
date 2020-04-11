import { TGetFilterArgs, TGetMethodArgs, TGetMethodResult, TGqlType } from '@jms-1/mongodb-graphql'

import * as entities from './entities'

import { ContainerCollection } from '../collections/container'
import { GenreCollection } from '../collections/genre'
import { LanguageCollection } from '../collections/language'
import { SeriesCollection } from '../collections/series'

export { TContainerType } from './container'

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

export type IContainer = TGqlType<typeof entities.Container>

export type IContainerFindArgs = TGetFilterArgs<typeof ContainerCollection, 'find'>
export type IContainerFindResult = TGetMethodResult<typeof ContainerCollection, 'find'>

export type IContainerFindOneArgs = TGetMethodArgs<typeof ContainerCollection, 'findOne'>
export type IContainerFindOneResult = TGetMethodResult<typeof ContainerCollection, 'findOne'>

export type IContainerAddArgs = TGetMethodArgs<typeof ContainerCollection, 'add'>
export type IContainerAddResult = TGetMethodResult<typeof ContainerCollection, 'add'>

export type IContainerUpdateArgs = TGetMethodArgs<typeof ContainerCollection, 'update'>
export type IContainerUpdateResult = TGetMethodResult<typeof ContainerCollection, 'update'>

export type IContainerRemoveArgs = TGetMethodArgs<typeof ContainerCollection, 'remove'>
export type IContainerRemoveResult = TGetMethodResult<typeof ContainerCollection, 'remove'>

export type ISeries = TGqlType<typeof entities.Series>

export type ISeriesFindArgs = TGetFilterArgs<typeof SeriesCollection, 'find'>
export type ISeriesFindResult = TGetMethodResult<typeof SeriesCollection, 'find'>

export type ISeriesFindOneArgs = TGetMethodArgs<typeof SeriesCollection, 'findOne'>
export type ISeriesFindOneResult = TGetMethodResult<typeof SeriesCollection, 'findOne'>

export type ISeriesAddArgs = TGetMethodArgs<typeof SeriesCollection, 'add'>
export type ISeriesAddResult = TGetMethodResult<typeof SeriesCollection, 'add'>

export type ISeriesUpdateArgs = TGetMethodArgs<typeof SeriesCollection, 'update'>
export type ISeriesUpdateResult = TGetMethodResult<typeof SeriesCollection, 'update'>

export type ISeriesRemoveArgs = TGetMethodArgs<typeof SeriesCollection, 'remove'>
export type ISeriesRemoveResult = TGetMethodResult<typeof SeriesCollection, 'remove'>
