import { collectionName, IDbRecording, RecordingSchema } from './entities/recording'
import { CollectionBase } from './utils'
import { validate } from './validation'

export * from './entities/recording'

const dateReg = /^CAST\(N'([^\.]+)(\.\d+)?' AS DateTime\)$/

export const recordingCollection = new (class extends CollectionBase<IDbRecording> {
    readonly name = collectionName

    readonly schema = RecordingSchema

    fromSql(sql: any): void {
        const date = dateReg.exec(sql.Created)

        const recording: IDbRecording = {
            _id: sql.Id,
            created: (date && `${date[1]}Z`) || sql.Created,
            genres: [],
            languages: [],
            links: [],
            media: sql.Media,
            name: sql.Name,
        }

        if (sql.Description) {
            recording.description = sql.Description
        }

        if (sql.RentTo) {
            recording.rentTo = sql.RentTo
        }

        if (sql.Series) {
            recording.series = sql.Series
        }

        const errors = validate(recording, this.schema)

        if (errors) {
            throw new Error(JSON.stringify(errors))
        }

        this.cacheMigrated(recording)
    }
})()
