import * as types from "@jms-1/mongodb-graphql/lib/types";

import { ForeignKeyCollection, IItem } from "./foreignKey";

import { IRecording } from "../model";

interface IHierarchicalItem extends IItem {
  parentId?: string;
}

export abstract class HierarchicalCollection<
  TModel extends types.GqlRecord<TItem, TLayout>,
  TItem = types.TGqlType<TModel>,
  TLayout = types.TGqlLayoutType<TModel>,
> extends ForeignKeyCollection<TModel, TItem, TLayout> {
  abstract readonly entityName: string;
  abstract readonly parentProp: keyof IRecording;

  private async demandParent(parentId?: string): Promise<boolean> {
    if (!parentId) {
      return false;
    }

    const self = await this.collection;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parent: unknown = await self.findOne({ _id: parentId } as any);

    if (!parent) {
      throw new Error(`Übergeordnete ${this.entityName} unbekannt.`);
    }

    return true;
  }

  async beforeInsert(item: TItem & IHierarchicalItem): Promise<void> {
    await this.demandParent(item.parentId);
  }

  async beforeUpdate(item: Partial<TItem>, id: string): Promise<void> {
    const hitem = item as Partial<TItem> & IHierarchicalItem;

    if (!(await this.demandParent(hitem.parentId))) {
      return;
    }

    const self = await this.collection;
    const all = await self
      .find<IHierarchicalItem>({}, { projection: { _id: 1, parentId: 1 } })
      .toArray();

    const parentMap: Record<string, string> = {};

    all.forEach((c) => (parentMap[c._id] = c.parentId || ""));

    parentMap[id] = hitem.parentId || "";

    const cycleTest = new Set<string>();

    for (; id; id = parentMap[id]) {
      if (cycleTest.has(id)) {
        throw new Error("Zyklische Definition nicht zulässig");
      }

      cycleTest.add(id);
    }
  }

  async afterRemove(item: TItem & IHierarchicalItem): Promise<void> {
    const self = await this.collection;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await self.updateMany(
      { parentId: item._id } as any,
      { $unset: { parentId: null } } as any
    );
  }
}
