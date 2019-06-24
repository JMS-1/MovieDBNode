"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getVersion_1 = require("./getVersion");
function installApi(app) {
    app.use(getVersion_1.getVersion);
}
exports.installApi = installApi;

//# sourceMappingURL=index.js.map
