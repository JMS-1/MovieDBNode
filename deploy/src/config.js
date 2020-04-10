"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
function loadConfig(name) {
    const defPath = path_1.join(__dirname, `../config${name}.json`);
    if (!fs_1.existsSync(defPath)) {
        return undefined;
    }
    const raw = fs_1.readFileSync(defPath).toString();
    return JSON.parse(raw.substr(raw.indexOf('{')));
}
exports.Config = Object.assign(Object.assign({}, loadConfig('')), loadConfig('.custom'));

//# sourceMappingURL=config.js.map
