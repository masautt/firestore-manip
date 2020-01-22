"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var admin_1 = require("../admin");
exports.makeCollectionCamelCase = function (collection) {
    return admin_1.db.collection(collection).get()
        .then(function (snapshot) {
        snapshot.forEach(function (doc) {
            var tempItem = doc.data();
            var tempItemId = doc.id;
            if (!isKeysCamelCase(tempItem)) {
                var newItem_1 = makeKeysCamelCase(tempItem);
                console.log("Found item " + tempItemId + " with data " + tempItem + " in " + collection);
                admin_1.db.collection(collection).doc(tempItemId).delete()
                    .then(function () { return admin_1.db.collection(collection).doc(tempItemId).set(newItem_1); })
                    .then(function () { return console.log("Item " + tempItemId + " with data " + tempItem + " in " + collection + " has been camelCased"); });
            }
        });
    });
};
var makeStrCamelCase = function (str) { return "" + (str.charAt(0).toLowerCase() + str.slice(1)); };
var isStrCamelCase = function (str) { return str.charAt(0) === str.charAt(0).toLowerCase(); };
var makeKeysCamelCase = function (body) {
    Object.keys(body).forEach(function (key) {
        body[makeStrCamelCase(key)] = body[key];
        delete body[key];
    });
    return body;
};
var isKeysCamelCase = function (body) {
    var isCamelCase = true;
    Object.keys(body).forEach(function (key) {
        if (!isStrCamelCase(key))
            isCamelCase = false;
    });
    return isCamelCase;
};
