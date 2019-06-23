"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path_1 = require("path");
const app = express();
app.use(express.static(path_1.join(__dirname, '../dist')));
app.listen(29099);

//# sourceMappingURL=startup.js.map
