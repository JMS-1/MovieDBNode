import { Collection } from '@jms-1/mongodb-graphql/lib/collection'
import { Collection as MongoCollection } from 'mongodb'

import { ISeries } from 'movie-db-api'

import { collectionNames } from './collections'
import { MongoConnection } from './connection'

import { Series } from '../model/entities'

export const SeriesCollection = MongoConnection.createCollection(
    Series,
    class extends Collection<typeof Series> {
        readonly collectionName = collectionNames.series

        private async demandParent(parentId: string): Promise<boolean> {
            if (!parentId) {
                return false
            }

            const self = await this.collection
            const parent = await self.findOne({ _id: parentId })

            if (!parent) {
                throw new Error('Übergeordnete Serie unbekannt.')
            }

            return true
        }

        protected async beforeInsert(container: ISeries): Promise<void> {
            await this.demandParent(container.parentId)
        }

        protected async beforeUpdate(container: ISeries, id: string): Promise<void> {
            if (!(await this.demandParent(container.parentId))) {
                return
            }

            const self = await this.collection
            const all = await self.find({}, { projection: { _id: 1, parentId: 1 } }).toArray()

            const parentMap: Record<string, string> = {}

            all.forEach((c) => (parentMap[c._id] = c.parentId))

            parentMap[id] = container.parentId

            const cycleTest = new Set<string>()

            for (; id; id = parentMap[id]) {
                if (cycleTest.has(id)) {
                    throw new Error('Zyklische Definition von Serien nicht zulässig')
                }

                cycleTest.add(id)
            }
        }
        protected async beforeRemove(_id: string): Promise<void> {
            const recordings = await this._connection.getCollection(collectionNames.recordings)
            const count = await recordings.countDocuments({ series: _id })

            switch (count) {
                case 0:
                    return
                case 1:
                    throw new Error('Serie wird noch für eine Aufzeichnung verwendet')
                default:
                    throw new Error(`Serie wird noch für ${count} Aufzeichnungen verwendet`)
            }
        }

        protected async afterRemove(series: ISeries): Promise<void> {
            const self = await this.collection
            const children = await self.find({ parentId: series._id }).toArray()

            await self.updateMany({ parentId: series._id }, { $unset: { parentId: null } })

            await this.updateFullNameByChildren(children, '', self, new Set<string>())
        }

        private async updateFullName(
            series: ISeries,
            parent: string,
            self: MongoCollection<ISeries>,
            updated: Set<string>
        ): Promise<Set<string>> {
            if (updated.has(series._id)) {
                return updated
            }

            updated.add(series._id)

            const fullName = parent ? `${parent} > ${series.name}` : series.name

            await self.findOneAndUpdate({ _id: series._id }, { $set: { fullName } })

            return this.updateFullNameByParent(series._id, fullName, self, updated)
        }

        private async updateFullNameByChildren(
            children: ISeries[],
            parentName: string,
            self: MongoCollection<ISeries>,
            updated: Set<string>
        ): Promise<Set<string>> {
            for (const child of children) {
                await this.updateFullName(child, parentName, self, updated)
            }

            return updated
        }

        private async updateFullNameByParent(
            parentId: string,
            parentName: string,
            self: MongoCollection<ISeries>,
            updated: Set<string>
        ): Promise<Set<string>> {
            return this.updateFullNameByChildren(await self.find({ parentId }).toArray(), parentName, self, updated)
        }

        async refreshFullNames(series?: ISeries): Promise<Set<string>> {
            const self = await this.collection

            if (!series) {
                return this.updateFullNameByParent(null, '', self, new Set<string>())
            }

            const parent = await self.findOne({ _id: series.parentId })

            return this.updateFullName(series, parent?.fullName, self, new Set<string>())
        }
    }
)
