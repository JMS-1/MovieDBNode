import { TGetFilterArgs, TGetMethodArgs, TGetMethodResult, TGqlType, TCollection } from '@jms-1/mongodb-graphql'

import * as entities from './entities'

import { ContainerCollection } from '../collections/container'
import { GenreCollection } from '../collections/genre'
import { LanguageCollection } from '../collections/language'
import { RecordingCollection } from '../collections/recording'
import { SeriesCollection } from '../collections/series'

export * from './enum'

export type ILanguage = TGqlType<typeof entities.Language>

type TLanguageCollection = TCollection<typeof LanguageCollection>

export type ILanguageFindArgs = TGetFilterArgs<TLanguageCollection, 'find'>
export type ILanguageFindResult = TGetMethodResult<TLanguageCollection, 'find'>

export type ILanguageFindOneArgs = TGetMethodArgs<TLanguageCollection, 'findOne'>
export type ILanguageFindOneResult = TGetMethodResult<TLanguageCollection, 'findOne'>

export type ILanguageAddArgs = TGetMethodArgs<TLanguageCollection, 'add'>
export type ILanguageAddResult = TGetMethodResult<TLanguageCollection, 'add'>

export type ILanguageUpdateArgs = TGetMethodArgs<TLanguageCollection, 'update'>
export type ILanguageUpdateResult = TGetMethodResult<TLanguageCollection, 'update'>

export type ILanguageRemoveArgs = TGetMethodArgs<TLanguageCollection, 'remove'>
export type ILanguageRemoveResult = TGetMethodResult<TLanguageCollection, 'remove'>

export type IGenre = TGqlType<typeof entities.Genre>

type TGenreCollection = TCollection<typeof GenreCollection>

export type IGenreFindArgs = TGetFilterArgs<TGenreCollection, 'find'>
export type IGenreFindResult = TGetMethodResult<TGenreCollection, 'find'>

export type IGenreFindOneArgs = TGetMethodArgs<TGenreCollection, 'findOne'>
export type IGenreFindOneResult = TGetMethodResult<TGenreCollection, 'findOne'>

export type IGenreAddArgs = TGetMethodArgs<TGenreCollection, 'add'>
export type IGenreAddResult = TGetMethodResult<TGenreCollection, 'add'>

export type IGenreUpdateArgs = TGetMethodArgs<TGenreCollection, 'update'>
export type IGenreUpdateResult = TGetMethodResult<TGenreCollection, 'update'>

export type IGenreRemoveArgs = TGetMethodArgs<TGenreCollection, 'remove'>
export type IGenreRemoveResult = TGetMethodResult<TGenreCollection, 'remove'>

export type IContainer = TGqlType<typeof entities.Container>

type TContainerCollection = TCollection<typeof ContainerCollection>

export type IContainerFindArgs = TGetFilterArgs<TContainerCollection, 'find'>
export type IContainerFindResult = TGetMethodResult<TContainerCollection, 'find'>

export type IContainerFindOneArgs = TGetMethodArgs<TContainerCollection, 'findOne'>
export type IContainerFindOneResult = TGetMethodResult<TContainerCollection, 'findOne'>

export type IContainerAddArgs = TGetMethodArgs<TContainerCollection, 'add'>
export type IContainerAddResult = TGetMethodResult<TContainerCollection, 'add'>

export type IContainerUpdateArgs = TGetMethodArgs<TContainerCollection, 'update'>
export type IContainerUpdateResult = TGetMethodResult<TContainerCollection, 'update'>

export type IContainerRemoveArgs = TGetMethodArgs<TContainerCollection, 'remove'>
export type IContainerRemoveResult = TGetMethodResult<TContainerCollection, 'remove'>

export type ISeries = TGqlType<typeof entities.Series>

type TSeriesCollection = TCollection<typeof SeriesCollection>

export type ISeriesFindArgs = TGetFilterArgs<TSeriesCollection, 'find'>
export type ISeriesFindResult = TGetMethodResult<TSeriesCollection, 'find'>

export type ISeriesFindOneArgs = TGetMethodArgs<TSeriesCollection, 'findOne'>
export type ISeriesFindOneResult = TGetMethodResult<TSeriesCollection, 'findOne'>

export type ISeriesAddArgs = TGetMethodArgs<TSeriesCollection, 'add'>
export type ISeriesAddResult = TGetMethodResult<TSeriesCollection, 'add'>

export type ISeriesUpdateArgs = TGetMethodArgs<TSeriesCollection, 'update'>
export type ISeriesUpdateResult = TGetMethodResult<TSeriesCollection, 'update'>

export type ISeriesRemoveArgs = TGetMethodArgs<TSeriesCollection, 'remove'>
export type ISeriesRemoveResult = TGetMethodResult<TSeriesCollection, 'remove'>

export type ILink = TGqlType<typeof entities.Link>
export type IRecording = TGqlType<typeof entities.Recording>

type TRecordingCollection = TCollection<typeof RecordingCollection>

export type IRecordingFindArgs = TGetFilterArgs<TRecordingCollection, 'find'>
export type IRecordingFindResult = TGetMethodResult<TRecordingCollection, 'find'>

export type IRecordingFindOneArgs = TGetMethodArgs<TRecordingCollection, 'findOne'>
export type IRecordingFindOneResult = TGetMethodResult<TRecordingCollection, 'findOne'>

export type IRecordingAddArgs = TGetMethodArgs<TRecordingCollection, 'add'>
export type IRecordingAddResult = TGetMethodResult<TRecordingCollection, 'add'>

export type IRecordingUpdateArgs = TGetMethodArgs<TRecordingCollection, 'update'>
export type IRecordingUpdateResult = TGetMethodResult<TRecordingCollection, 'update'>

export type IRecordingRemoveArgs = TGetMethodArgs<TRecordingCollection, 'remove'>
export type IRecordingRemoveResult = TGetMethodResult<TRecordingCollection, 'remove'>

export type IRecordingFindByContainerArgs = TGetFilterArgs<TRecordingCollection, 'findByContainer'>
export type IRecordingFindByContainerResult = TGetMethodResult<TRecordingCollection, 'findByContainer'>

export type IQueryCountInfo = TGqlType<typeof entities.QueryCountInfo>

export type IRecordingQueryArgs = TGetMethodArgs<TRecordingCollection, 'query'>
export type IRecordingQueryResult = TGetMethodResult<TRecordingCollection, 'query'>
