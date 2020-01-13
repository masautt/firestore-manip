"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.populateIFTTTDateStrs = function (db, collection, limit) {
};
exports.genEpochs = function (limit) {
    if (limit === void 0) { limit = 10; }
    var dates = [];
    Array.from({ length: limit }, function () {
        dates.push(Math.floor(Math.pow(10, 13) + Math.random() * (9 * Math.pow(10, 13))));
    });
    return dates;
};
exports.populateFirebaseTimestamps = function (db, collection, limit) {
};
