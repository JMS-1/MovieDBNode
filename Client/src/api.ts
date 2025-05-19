export interface ILink {
  description?: string;
  name: string;
  url: string;
}

export enum recordingContainerType {
  BluRay = 5,
  DVD = 4,
  RecordedDVD = 3,
  SuperVideoCD = 2,
  Undefined = 0,
  VideoCD = 1,
}

export enum recordingDeleteType {
  Deletable = 2,
  Deleted = 1,
  None = 0,
}

export interface IRecording {
  _id: string;
  containerId?: string;
  containerPosition?: string;
  containerType: recordingContainerType;
  created: string;
  deleteType?: recordingDeleteType;
  description?: string;
  fullName: string;
  genres: string[];
  languages: string[];
  links: ILink[];
  name: string;
  rating?: number;
  rentTo?: string;
  series?: string;
}

export interface ICounted {
  _id: string;
  count: number;
}

export interface IRecordingQueryRequest {
  correlationId?: string;
  deleteType?: recordingDeleteType;
  firstPage: number;
  forExport?: boolean;
  fullName?: string;
  genres?: string[];
  language?: string;
  pageSize: number;
  rating?: number;
  rent?: boolean;
  series?: string[];
  sort: 'created' | 'fullName' | 'rating';
  sortOrder: 'Ascending' | 'Descending';
}

export interface IRecordingQueryResult {
  correlationId: string;
  count: number;
  genres: ICounted[];
  languages: ICounted[];
  total: number;
  view: IRecording[];
}

export interface ILanguage {
  _id: string;
  name: string;
}

export interface ILanguageFindResult {
  items: ILanguage[];
}

export interface IGenre {
  _id: string;
  name: string;
}

export interface IGenreFindResult {
  items: IGenre[];
}

export interface ISeries {
  _id: string;
  description?: string;
  fullName: string;
  name: string;
  parentId?: string;
}

export interface ISeriesFindResult {
  items: ISeries[];
}

export enum containerType {
  Box = 2,
  Disk = 4,
  FeatureSet = 1,
  Folder = 5,
  Shelf = 3,
  Undefined = 0,
}

export interface IContainer {
  _id: string;
  description?: string;
  name: string;
  parentId?: string;
  parentLocation?: string;
  type: containerType;
}

export interface IContainerFindResult {
  items: IContainer[];
}
