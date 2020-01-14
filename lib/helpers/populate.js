"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var timestamps_1 = require("./timestamps");
exports.populate_iftttDateStrs = function (db, collection, limit, dateStrParam) {
    if (limit === void 0) { limit = 10; }
    if (dateStrParam === void 0) { dateStrParam = "OccuredAt"; }
    var epochs = exports.genEpochs(limit);
    console.log("Generated " + limit + " documents with dateStrParamm " + dateStrParam);
    epochs.map(function (epoch) {
        var _a;
        var name = Math.random().toString(36).slice(2);
        var date = timestamps_1.dateObj_to_iftttDateStr(new Date(epoch));
        db.collection(collection).add((_a = {},
            _a[dateStrParam] = date,
            _a.name = name,
            _a)).then(function (ref) {
            console.log("Added document " + ref.id + " with name " + name + " and date " + date);
        });
    });
};
exports.populate_FirebaseTimestamps = function (db, collection, limit, dateStrParam) {
    var epochs = exports.genEpochs(limit);
    epochs.map(function (epoch) {
        var _a;
        db.collection(collection).add((_a = {},
            _a[dateStrParam] = timestamps_1.dateObj_to_firebaseTimestamp(new Date(epoch)),
            _a.name = Math.random().toString(36).slice(2),
            _a));
    });
};
exports.genEpochs = function (limit) {
    if (limit === void 0) { limit = 10; }
    var dates = [];
    var epochSize = Math.pow(10, 13);
    Array.from({ length: limit }, function () {
        dates.push(Math.floor(epochSize + Math.random() * (epochSize * 9)));
    });
    return dates;
};
