"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uuid_1 = require("uuid");
const utils_1 = require("../utils");
function processApiRequest(processor, request, response) {
    function onError(error) {
        const message = utils_1.getError(error);
        try {
            response.write(message);
            response.sendStatus(400);
        }
        catch (error) {
            utils_1.apiError('unable to process %s: %s', request.originalUrl, message);
        }
    }
    try {
        const result = processor(request.body);
        const promise = result instanceof Promise ? result : Promise.resolve(result);
        promise
            .then(data => {
            try {
                response.header('Cache-Control', 'private, no-cache, no-store, must-revalidate').json(data);
            }
            catch (error) {
                onError(error);
            }
        }, onError)
            .catch(onError);
    }
    catch (error) {
        onError(error);
    }
}
exports.processApiRequest = processApiRequest;
class Api {
    constructor(_path, _db, _toProtocol, _toEntity) {
        this._path = _path;
        this._db = _db;
        this._toProtocol = _toProtocol;
        this._toEntity = _toEntity;
        this.query = async () => {
            const list = await this._db.find();
            return {
                list: list.map(this._toProtocol),
            };
        };
        this.create = async (item) => {
            const dbItem = this._toEntity(item, uuid_1.v4());
            return {
                item: this._toProtocol(dbItem),
                errors: await this._db.insertOne(dbItem),
            };
        };
        this.update = async (item, id) => {
            const dbItem = this._toEntity(item, id);
            return {
                item: this._toProtocol(dbItem),
                errors: await this._db.findOneAndReplace(dbItem),
            };
        };
    }
    createRouter() {
        return express_1.Router().use(this._path, express_1.Router()
            .get('/', (req, res) => processApiRequest(this.query, req, res))
            .post('/', (req, res) => processApiRequest(this.create, req, res))
            .put('/:id', (req, res) => processApiRequest(async (item) => this.update(item, req.params.id), req, res)));
    }
}
function createApiRouter(path, db, toProtocol, toEntity) {
    const api = new Api(path, db, toProtocol, toEntity);
    return api.createRouter();
}
exports.createApiRouter = createApiRouter;

//# sourceMappingURL=utils.js.map
