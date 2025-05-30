import { Collection as MongoCollection } from "mongodb";

import { collectionNames } from "./collections";
import { MongoConnection } from "./connection";
import { HierarchicalCollection } from "./hierarchical";
import { refreshRecordingNames } from "./utils";

import { ISeries } from "../model";
import { Series } from "../model/entities";

class SeriesHierarchicalCollection extends HierarchicalCollection<
  typeof Series
> {
  readonly collectionName = collectionNames.series;
  readonly entityName = "Serie";
  readonly parentProp = "series";

  async initialize(): Promise<void> {
    await super.initialize();

    const self = await this.collection;

    await self.createIndex({ fullName: 1 }, { name: "series_full" });
    await self.createIndex({ name: 1 }, { name: "series_name" });
    await self.createIndex({ parentId: 1 }, { name: "series_tree" });
  }

  async afterInsert(series: ISeries): Promise<void> {
    await this.refreshFullNames(series);
  }

  async afterUpdate(series: ISeries): Promise<void> {
    const seriesIds = await this.refreshFullNames(series);

    await refreshRecordingNames(
      { series: { $in: Array.from(seriesIds) } },
      await this.connection.getCollection(collectionNames.recordings)
    );
  }

  async afterRemove(series: ISeries): Promise<void> {
    const self = await this.collection;
    const children = await self.find({ parentId: series._id }).toArray();

    await super.afterRemove(series);

    const seriesIds = await this.updateFullNameByChildren(
      children,
      "",
      self,
      new Set<string>()
    );

    await refreshRecordingNames(
      { series: { $in: Array.from(seriesIds) } },
      await this.connection.getCollection(collectionNames.recordings)
    );
  }

  async updateFullName(
    series: ISeries,
    parent: string | undefined,
    self: MongoCollection<ISeries>,
    updated: Set<string>
  ): Promise<Set<string>> {
    if (updated.has(series._id)) {
      return updated;
    }

    updated.add(series._id);

    const fullName = parent ? `${parent} > ${series.name}` : series.name;

    await self.findOneAndUpdate({ _id: series._id }, { $set: { fullName } });

    series.fullName = fullName;

    return this.updateFullNameByParent(series._id, fullName, self, updated);
  }

  async updateFullNameByChildren(
    children: ISeries[],
    parentName: string,
    self: MongoCollection<ISeries>,
    updated: Set<string>
  ): Promise<Set<string>> {
    for (const child of children) {
      await this.updateFullName(child, parentName, self, updated);
    }

    return updated;
  }

  async updateFullNameByParent(
    parentId: string,
    parentName: string,
    self: MongoCollection<ISeries>,
    updated: Set<string>
  ): Promise<Set<string>> {
    return this.updateFullNameByChildren(
      await self.find({ parentId }).toArray(),
      parentName,
      self,
      updated
    );
  }

  async refreshFullNames(series: ISeries): Promise<Set<string>> {
    const self = await this.collection;
    const parent = await self.findOne({ _id: series.parentId });

    return this.updateFullName(
      series,
      parent?.fullName,
      self,
      new Set<string>()
    );
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SeriesCollection = MongoConnection.createCollection(
  Series,
  SeriesHierarchicalCollection
);
