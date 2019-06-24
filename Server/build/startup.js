"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path_1 = require("path");
const api_1 = require("./api");
const app = express();
app.use(express.static(path_1.join(__dirname, '../dist')));
api_1.installApi(app);
app.listen(29099);

//# sourceMappingURL=startup.js.map
