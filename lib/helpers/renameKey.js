"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var admin_1 = require("../admin");
exports.renameKey = function (collection, fromKey, toKey) {
    return admin_1.db.collection(collection).get()
        .then(function (snapshot) {
        snapshot.forEach(function (doc) {
            var tempItem = doc.data();
            var tempItemId = doc.id;
            if (keysContainStr(tempItem, fromKey)) {
                var newItem_1 = makeContainStr(tempItem, fromKey, toKey);
                console.log("Found item " + tempItemId + " with key " + fromKey + " in " + collection);
                admin_1.db.collection(collection).doc(tempItemId).delete()
                    .then(function () { return admin_1.db.collection(collection).doc(tempItemId).set(newItem_1); })
                    .then(function () { return console.log("Item " + tempItemId + " with key " + tempItem + " in " + collection + " has been changed to " + toKey); });
            }
        });
    });
};
var keysContainStr = function (body, str) {
    var containsStr = false;
    Object.keys(body).forEach(function (key) {
        if (key === str)
            containsStr = true;
    });
    return containsStr;
};
var makeContainStr = function (body, fromKey, toKey) {
    Object.keys(body).map(function (key) {
        if (key === fromKey) {
            body[toKey] = body[key];
            delete body[key];
        }
    });
    return body;
};
