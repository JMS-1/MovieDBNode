"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
function loadConfig(name) {
    const defPath = (0, path_1.join)(__dirname, `../config${name}.json`);
    if (!(0, fs_1.existsSync)(defPath)) {
        return undefined;
    }
    const raw = (0, fs_1.readFileSync)(defPath).toString();
    return JSON.parse(raw.substring(raw.indexOf("{")));
}
exports.Config = Object.assign(Object.assign({}, loadConfig("")), loadConfig(".custom"));
//# sourceMappingURL=config.js.map