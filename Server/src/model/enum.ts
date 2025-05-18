export enum TContainerType {
  Box = 2,
  Disk = 4,
  FeatureSet = 1,
  Folder = 5,
  Shelf = 3,
  Undefined = 0,
}

export enum TRecordingContainerType {
  BluRay = 5,
  DVD = 4,
  RecordedDVD = 3,
  SuperVideoCD = 2,
  Undefined = 0,
  VideoCD = 1,
}

export enum TRecordingSort {
  created = 1,
  fullName = 0,
}

export enum TRecordingDeleteType {
  Deletable = 2,
  Deleted = 1,
  None = 0,
}
