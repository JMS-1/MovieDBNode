"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HierarchicalCollection = void 0;
const foreignKey_1 = require("./foreignKey");
class HierarchicalCollection extends foreignKey_1.ForeignKeyCollection {
    async demandParent(parentId) {
        if (!parentId) {
            return false;
        }
        const self = await this.collection;
        const parent = await self.findOne({ _id: parentId });
        if (!parent) {
            throw new Error(`Übergeordnete ${this.entityName} unbekannt.`);
        }
        return true;
    }
    async beforeInsert(item) {
        await this.demandParent(item.parentId);
    }
    async beforeUpdate(item, id) {
        const hitem = item;
        if (!(await this.demandParent(hitem.parentId))) {
            return;
        }
        const self = await this.collection;
        const all = await self
            .find({}, { projection: { _id: 1, parentId: 1 } })
            .toArray();
        const parentMap = {};
        all.forEach((c) => (parentMap[c._id] = c.parentId || ""));
        parentMap[id] = hitem.parentId || "";
        const cycleTest = new Set();
        for (; id; id = parentMap[id]) {
            if (cycleTest.has(id)) {
                throw new Error("Zyklische Definition nicht zulässig");
            }
            cycleTest.add(id);
        }
    }
    async afterRemove(item) {
        const self = await this.collection;
        await self.updateMany({ parentId: item._id }, { $unset: { parentId: null } });
    }
}
exports.HierarchicalCollection = HierarchicalCollection;
//# sourceMappingURL=hierarchical.js.map