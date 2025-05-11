import * as mongodbGraphql from "@jms-1/mongodb-graphql";

import * as entities from "./entities";

import { ContainerCollection } from "../collections/container";
import { GenreCollection } from "../collections/genre";
import { LanguageCollection } from "../collections/language";
import { RecordingCollection } from "../collections/recording";
import { SeriesCollection } from "../collections/series";

export * from "./enum";

export type ILanguage = mongodbGraphql.TGqlType<typeof entities.Language>;

type TLanguageCollection = mongodbGraphql.TCollection<
  typeof LanguageCollection
>;

export type ILanguageFindArgs = mongodbGraphql.TGetFilterArgs<
  TLanguageCollection,
  "find"
>;
export type ILanguageFindResult = mongodbGraphql.TGetMethodResult<
  TLanguageCollection,
  "find"
>;

export type ILanguageFindOneArgs = mongodbGraphql.TGetMethodArgs<
  TLanguageCollection,
  "findOne"
>;
export type ILanguageFindOneResult = mongodbGraphql.TGetMethodResult<
  TLanguageCollection,
  "findOne"
>;

export type ILanguageAddArgs = mongodbGraphql.TGetMethodArgs<
  TLanguageCollection,
  "add"
>;
export type ILanguageAddResult = mongodbGraphql.TGetMethodResult<
  TLanguageCollection,
  "add"
>;

export type ILanguageUpdateArgs = mongodbGraphql.TGetMethodArgs<
  TLanguageCollection,
  "update"
>;
export type ILanguageUpdateResult = mongodbGraphql.TGetMethodResult<
  TLanguageCollection,
  "update"
>;

export type ILanguageRemoveArgs = mongodbGraphql.TGetMethodArgs<
  TLanguageCollection,
  "remove"
>;
export type ILanguageRemoveResult = mongodbGraphql.TGetMethodResult<
  TLanguageCollection,
  "remove"
>;

export type IGenre = mongodbGraphql.TGqlType<typeof entities.Genre>;

type TGenreCollection = mongodbGraphql.TCollection<typeof GenreCollection>;

export type IGenreFindArgs = mongodbGraphql.TGetFilterArgs<
  TGenreCollection,
  "find"
>;
export type IGenreFindResult = mongodbGraphql.TGetMethodResult<
  TGenreCollection,
  "find"
>;

export type IGenreFindOneArgs = mongodbGraphql.TGetMethodArgs<
  TGenreCollection,
  "findOne"
>;
export type IGenreFindOneResult = mongodbGraphql.TGetMethodResult<
  TGenreCollection,
  "findOne"
>;

export type IGenreAddArgs = mongodbGraphql.TGetMethodArgs<
  TGenreCollection,
  "add"
>;
export type IGenreAddResult = mongodbGraphql.TGetMethodResult<
  TGenreCollection,
  "add"
>;

export type IGenreUpdateArgs = mongodbGraphql.TGetMethodArgs<
  TGenreCollection,
  "update"
>;
export type IGenreUpdateResult = mongodbGraphql.TGetMethodResult<
  TGenreCollection,
  "update"
>;

export type IGenreRemoveArgs = mongodbGraphql.TGetMethodArgs<
  TGenreCollection,
  "remove"
>;
export type IGenreRemoveResult = mongodbGraphql.TGetMethodResult<
  TGenreCollection,
  "remove"
>;

export type IContainer = mongodbGraphql.TGqlType<typeof entities.Container>;

type TContainerCollection = mongodbGraphql.TCollection<
  typeof ContainerCollection
>;

export type IContainerFindArgs = mongodbGraphql.TGetFilterArgs<
  TContainerCollection,
  "find"
>;
export type IContainerFindResult = mongodbGraphql.TGetMethodResult<
  TContainerCollection,
  "find"
>;

export type IContainerFindOneArgs = mongodbGraphql.TGetMethodArgs<
  TContainerCollection,
  "findOne"
>;
export type IContainerFindOneResult = mongodbGraphql.TGetMethodResult<
  TContainerCollection,
  "findOne"
>;

export type IContainerAddArgs = mongodbGraphql.TGetMethodArgs<
  TContainerCollection,
  "add"
>;
export type IContainerAddResult = mongodbGraphql.TGetMethodResult<
  TContainerCollection,
  "add"
>;

export type IContainerUpdateArgs = mongodbGraphql.TGetMethodArgs<
  TContainerCollection,
  "update"
>;
export type IContainerUpdateResult = mongodbGraphql.TGetMethodResult<
  TContainerCollection,
  "update"
>;

export type IContainerRemoveArgs = mongodbGraphql.TGetMethodArgs<
  TContainerCollection,
  "remove"
>;
export type IContainerRemoveResult = mongodbGraphql.TGetMethodResult<
  TContainerCollection,
  "remove"
>;

export type ISeries = mongodbGraphql.TGqlType<typeof entities.Series>;

type TSeriesCollection = mongodbGraphql.TCollection<typeof SeriesCollection>;

export type ISeriesFindArgs = mongodbGraphql.TGetFilterArgs<
  TSeriesCollection,
  "find"
>;
export type ISeriesFindResult = mongodbGraphql.TGetMethodResult<
  TSeriesCollection,
  "find"
>;

export type ISeriesFindOneArgs = mongodbGraphql.TGetMethodArgs<
  TSeriesCollection,
  "findOne"
>;
export type ISeriesFindOneResult = mongodbGraphql.TGetMethodResult<
  TSeriesCollection,
  "findOne"
>;

export type ISeriesAddArgs = mongodbGraphql.TGetMethodArgs<
  TSeriesCollection,
  "add"
>;
export type ISeriesAddResult = mongodbGraphql.TGetMethodResult<
  TSeriesCollection,
  "add"
>;

export type ISeriesUpdateArgs = mongodbGraphql.TGetMethodArgs<
  TSeriesCollection,
  "update"
>;
export type ISeriesUpdateResult = mongodbGraphql.TGetMethodResult<
  TSeriesCollection,
  "update"
>;

export type ISeriesRemoveArgs = mongodbGraphql.TGetMethodArgs<
  TSeriesCollection,
  "remove"
>;
export type ISeriesRemoveResult = mongodbGraphql.TGetMethodResult<
  TSeriesCollection,
  "remove"
>;

export type ILink = mongodbGraphql.TGqlType<typeof entities.Link>;
export type IRecording = mongodbGraphql.TGqlType<typeof entities.Recording>;

type TRecordingCollection = mongodbGraphql.TCollection<
  typeof RecordingCollection
>;

export type IRecordingFindArgs = mongodbGraphql.TGetFilterArgs<
  TRecordingCollection,
  "find"
>;
export type IRecordingFindResult = mongodbGraphql.TGetMethodResult<
  TRecordingCollection,
  "find"
>;

export type IRecordingFindOneArgs = mongodbGraphql.TGetMethodArgs<
  TRecordingCollection,
  "findOne"
>;
export type IRecordingFindOneResult = mongodbGraphql.TGetMethodResult<
  TRecordingCollection,
  "findOne"
>;

export type IRecordingAddArgs = mongodbGraphql.TGetMethodArgs<
  TRecordingCollection,
  "add"
>;
export type IRecordingAddResult = mongodbGraphql.TGetMethodResult<
  TRecordingCollection,
  "add"
>;

export type IRecordingUpdateArgs = mongodbGraphql.TGetMethodArgs<
  TRecordingCollection,
  "update"
>;
export type IRecordingUpdateResult = mongodbGraphql.TGetMethodResult<
  TRecordingCollection,
  "update"
>;

export type IRecordingRemoveArgs = mongodbGraphql.TGetMethodArgs<
  TRecordingCollection,
  "remove"
>;
export type IRecordingRemoveResult = mongodbGraphql.TGetMethodResult<
  TRecordingCollection,
  "remove"
>;

export type IRecordingFindByContainerArgs = mongodbGraphql.TGetMethodArgs<
  TRecordingCollection,
  "findByContainer"
>;
export type IRecordingFindByContainerResult = mongodbGraphql.TGetMethodResult<
  TRecordingCollection,
  "findByContainer"
>;

export type IQueryCountInfo = mongodbGraphql.TGqlType<
  typeof entities.QueryCountInfo
>;

export type IRecordingQueryArgs = mongodbGraphql.TGetMethodArgs<
  TRecordingCollection,
  "query"
>;
export type IRecordingQueryResult = mongodbGraphql.TGetMethodResult<
  TRecordingCollection,
  "query"
>;
