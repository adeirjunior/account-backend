"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const runDatabase = (uri) => {
    (0, mongoose_1.connect)(uri);
};
exports.default = runDatabase;
