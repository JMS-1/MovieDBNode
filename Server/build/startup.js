"use strict";
exports.__esModule = true;
var express = require("express");
var path_1 = require("path");
var app = express();
app.use(express.static(path_1.join(__dirname, '../dist')));
app.listen(29099);

//# sourceMappingURL=startup.js.map
