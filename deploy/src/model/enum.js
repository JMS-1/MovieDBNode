"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TRecordingDeleteType = exports.TRecordingSort = exports.TRecordingContainerType = exports.TContainerType = void 0;
var TContainerType;
(function (TContainerType) {
    TContainerType[TContainerType["Box"] = 2] = "Box";
    TContainerType[TContainerType["Disk"] = 4] = "Disk";
    TContainerType[TContainerType["FeatureSet"] = 1] = "FeatureSet";
    TContainerType[TContainerType["Folder"] = 5] = "Folder";
    TContainerType[TContainerType["Shelf"] = 3] = "Shelf";
    TContainerType[TContainerType["Undefined"] = 0] = "Undefined";
})(TContainerType || (exports.TContainerType = TContainerType = {}));
var TRecordingContainerType;
(function (TRecordingContainerType) {
    TRecordingContainerType[TRecordingContainerType["BluRay"] = 5] = "BluRay";
    TRecordingContainerType[TRecordingContainerType["DVD"] = 4] = "DVD";
    TRecordingContainerType[TRecordingContainerType["RecordedDVD"] = 3] = "RecordedDVD";
    TRecordingContainerType[TRecordingContainerType["SuperVideoCD"] = 2] = "SuperVideoCD";
    TRecordingContainerType[TRecordingContainerType["Undefined"] = 0] = "Undefined";
    TRecordingContainerType[TRecordingContainerType["VideoCD"] = 1] = "VideoCD";
})(TRecordingContainerType || (exports.TRecordingContainerType = TRecordingContainerType = {}));
var TRecordingSort;
(function (TRecordingSort) {
    TRecordingSort[TRecordingSort["created"] = 1] = "created";
    TRecordingSort[TRecordingSort["fullName"] = 0] = "fullName";
    TRecordingSort[TRecordingSort["rating"] = 2] = "rating";
})(TRecordingSort || (exports.TRecordingSort = TRecordingSort = {}));
var TRecordingDeleteType;
(function (TRecordingDeleteType) {
    TRecordingDeleteType[TRecordingDeleteType["Deletable"] = 2] = "Deletable";
    TRecordingDeleteType[TRecordingDeleteType["Deleted"] = 1] = "Deleted";
    TRecordingDeleteType[TRecordingDeleteType["None"] = 0] = "None";
})(TRecordingDeleteType || (exports.TRecordingDeleteType = TRecordingDeleteType = {}));
//# sourceMappingURL=enum.js.map