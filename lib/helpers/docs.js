"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDoc = function (db, collection, docKey, docVal) {
    db.collection(collection).where(docKey, '==', docVal).get()
        .then(function (snapshot) {
        snapshot.forEach(function (doc) {
        });
    });
};
exports.deleteDoc_by_keyVal = function (db, collection, key, val) {
    return db.collection(collection).where(key, '==', val).get()
        .then(function (snap) { return snap.forEach(function (doc) { return db.collection(collection).doc(doc.id).delete(); }); });
};
exports.deleteDoc_by_id = function (db, collection, docId) {
    return db.collection(collection).doc(docId).delete();
};
exports.deleteAllDocs = function (db, collection) {
    return db.collection(collection).get()
        .then(function (snap) { return snap.forEach(function (doc) { return db.collection(collection).doc(doc.id).delete(); }); });
};
exports.moveDoc_by_keyVal = function (db, collection1, collection2, key, val) {
    db.collection(collection1).where(key, '==', val).get()
        .then(function (snapshot) {
        snapshot.forEach(function (doc) {
            console.log(doc.data().OccuredAt._seconds);
        });
    });
};
