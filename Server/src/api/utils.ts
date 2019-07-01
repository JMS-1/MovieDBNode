import { Request, Response, Router } from 'express'
import { v4 as uuid } from 'uuid'

import * as movieDbApi from 'movie-db-api'

import { apiError, getError } from '../utils'

export function processApiRequest<TResponse, TRequest = {}>(
    processor: (body?: TRequest) => TResponse | Promise<TResponse>,
    request: Request,
    response: Response,
): void {
    function onError(error: any): void {
        const message = getError(error)

        try {
            response.write(message)
            response.sendStatus(400)
        } catch (error) {
            apiError('unable to process %s: %s', request.originalUrl, message)
        }
    }

    try {
        const result = processor(request.body)
        const promise = result instanceof Promise ? result : Promise.resolve(result)

        promise
            .then(data => {
                try {
                    response.header('Cache-Control', 'private, no-cache, no-store, must-revalidate').json(data)
                } catch (error) {
                    onError(error)
                }
            }, onError)
            .catch(onError)
    } catch (error) {
        onError(error)
    }
}

interface IApiCollection<TDbItem> {
    deleteOne(id: string): Promise<movieDbApi.IValidationError[]>
    find(): Promise<TDbItem[]>
    findOneAndReplace(item: TDbItem): Promise<movieDbApi.IValidationError[]>
    insertOne(item: TDbItem): Promise<movieDbApi.IValidationError[]>
}

class Api<TNewItem, TFullItem extends movieDbApi.TItem<TNewItem>, TDbItem> {
    constructor(
        private readonly _path: string,
        private readonly _db: IApiCollection<TDbItem>,
        private readonly _toProtocol: (dbItem: TDbItem) => TFullItem,
        private readonly _toEntity: (item: TNewItem, id: string) => TDbItem,
    ) {}

    private readonly query = async (): Promise<movieDbApi.IApiQueryResponse<TFullItem>> => {
        const list = await this._db.find()

        return <movieDbApi.IApiQueryResponse<TFullItem>>{
            list: list.map(this._toProtocol),
        }
    }

    private readonly create = async (item: TNewItem): Promise<movieDbApi.IApiUpdateResponse<TFullItem>> => {
        const dbItem = this._toEntity(item, uuid())

        return <movieDbApi.IApiUpdateResponse<TFullItem>>{
            item: this._toProtocol(dbItem),
            errors: await this._db.insertOne(dbItem),
        }
    }

    private readonly update = async (item: TNewItem, id: string): Promise<movieDbApi.IApiUpdateResponse<TFullItem>> => {
        const dbItem = this._toEntity(item, id)

        return <movieDbApi.IApiUpdateResponse<TFullItem>>{
            item: this._toProtocol(dbItem),
            errors: await this._db.findOneAndReplace(dbItem),
        }
    }

    private readonly remove = async (id: string): Promise<movieDbApi.IApiDeleteResponse> => {
        return <movieDbApi.IApiDeleteResponse>{
            id,
            errors: await this._db.deleteOne(id),
        }
    }

    createRouter(): Router {
        return Router().use(
            this._path,
            Router()
                .delete('/:id', (req, res) => processApiRequest(() => this.remove(req.params.id), req, res))
                .get('/', (req, res) => processApiRequest(this.query, req, res))
                .post('/', (req, res) => processApiRequest(this.create, req, res))
                .put('/:id', (req, res) => processApiRequest((i: TNewItem) => this.update(i, req.params.id), req, res)),
        )
    }
}

export function createApiRouter<TNewItem, TFullItem extends movieDbApi.TItem<TNewItem>, TDbItem>(
    path: string,
    db: IApiCollection<TDbItem>,
    toProtocol: (dbItem: TDbItem) => TFullItem,
    toEntity: (item: TNewItem, id: string) => TDbItem,
): Router {
    const api = new Api(path, db, toProtocol, toEntity)

    return api.createRouter()
}
