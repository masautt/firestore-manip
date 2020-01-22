"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDoc_by_keyVal = function (db, collection, key, val) {
    return db.collection(collection).where(key, '==', val).get()
        .then(function (snap) {
        snap.forEach(function (doc) {
            console.log("FOUND doc " + doc.id + " with key/val {" + key + ":" + val + "} in " + collection);
            db.collection(collection).doc(doc.id).delete()
                .then(function () { return console.log("DELETED Doc " + doc.id + " with key/val {" + key + ":" + val + "} in " + collection); })
                .catch(function (err) { return console.log("ERROR occured trying to delete Doc " + doc.id + " from  " + collection + "\n" + err); });
        });
    });
};
exports.deleteDoc_by_id = function (db, collection, docId) {
    return db.collection(collection).doc(docId).delete()
        .then(function () { return console.log("DELETED Doc " + docId + " in " + collection); })
        .catch(function (err) { return console.log("ERROR occured trying to delete Doc " + docId + " from  " + collection + "\n" + err); });
};
exports.deleteAllDocs = function (db, collection) {
    return db.collection(collection).get()
        .then(function (snap) { return snap.forEach(function (doc) {
        return db.collection(collection).doc(doc.id).delete()
            .then(function () { return console.log("DELETED Doc " + doc.id + " in " + collection); })
            .catch(function (err) { return console.log("ERROR occured trying to delete Doc " + doc.id + " from  " + collection + "\n" + err); });
    }); });
};
exports.moveDoc_by_keyVal = function (db, collection1, collection2, key, val) {
    db.collection(collection1).where(key, '==', val).get()
        .then(function (snapshot) {
        snapshot.forEach(function (doc) {
            var newDoc = doc.data();
            console.log("Doc with id " + doc.id + " found with key/val {" + key + ":" + val + "} in " + collection1);
            db.collection(collection2).doc(doc.id).set(newDoc)
                .then(function () { return console.log("Doc with id " + doc.id + " and key/val {" + key + ":" + val + "} moved from " + collection1 + " to " + collection2); })
                .catch(function (err) { return console.log("ERROR occured trying to move Doc " + doc.id + " with key/val {" + key + ":" + val + "} from " + collection1 + " to " + collection2 + "\n" + err); });
        });
    });
};
