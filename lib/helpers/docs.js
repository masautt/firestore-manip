"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDoc = function (db, collection, docKey, docVal) {
    db.collection(collection).where(docKey, '==', docVal).get()
        .then(function (snapshot) {
        snapshot.forEach(function (doc) {
        });
    });
};
exports.moveDoc = function (db, collection1, collection2, docKey, docVal) {
    db.collection(collection1).where(docKey, '==', docVal).get()
        .then(function (snapshot) {
        snapshot.forEach(function (doc) {
            console.log(doc.data().OccuredAt._seconds);
        });
    });
};
