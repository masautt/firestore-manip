"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var admin = __importStar(require("firebase-admin"));
exports.iftttDateStr_to_firebaseTimestamp = function (dateStr) {
    var ampm = dateStr.slice(-2);
    var cleanDateStr = dateStr.substring(0, dateStr.length - 2).replace(" at", "");
    var clientDate = new Date(cleanDateStr + " " + ampm);
    return (admin.firestore.Timestamp.fromDate(clientDate));
};
exports.dateObj_to_firebaseTimestamp = function (date) { return admin.firestore.Timestamp.fromDate(date); };
exports.dateObj_to_iftttDateStr = function (date) {
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var month = months[date.getMonth()];
    var day = date.getDate();
    var year = date.getFullYear();
    var hours = date.getHours() === 0 ? 12 : date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    var ampm = date.getHours() >= 12 ? "PM" : "AM";
    var iftttDateStr = month + " " + day + ", " + year + " at " + hours + ":" + minutes + ampm;
    return iftttDateStr;
};
exports.replace_iftttDateStrParam_with_firebaseTimestampParam = function (db, inputCollection, outputCollection, dateStrParam) {
    db.collection(inputCollection).get().then(function (snapshot) {
        snapshot.forEach(function (doc) {
            if (typeof (doc.data()[dateStrParam]) == 'string') {
                var newDoc = doc.data();
                newDoc[dateStrParam] = exports.iftttDateStr_to_firebaseTimestamp(doc.data()[dateStrParam]);
                db.collection(outputCollection).doc(doc.id).set(newDoc);
            }
        });
    })
        .catch(function (err) {
        console.log("Error getting documents from " + inputCollection, err);
    });
};
exports.add_iftttDateStrParam = function (db, collection, dateStrParam) {
    db.collection(collection).get().then(function (snapshot) {
        snapshot.forEach(function (doc) {
            var newDoc = doc.data();
            newDoc[dateStrParam] = exports.dateObj_to_iftttDateStr(new Date());
            db.collection(collection).doc(doc.id).set(newDoc);
        });
    })
        .catch(function (err) {
        console.log("Error getting documents from " + collection, err);
    });
};
exports.add_firebaseTimestampParam = function (db, collection, dateStrParam) {
    db.collection(collection).get().then(function (snapshot) {
        snapshot.forEach(function (doc) {
            var newDoc = doc.data();
            newDoc[dateStrParam] = admin.firestore.Timestamp.fromDate(new Date());
            db.collection(collection).doc(doc.id).set(newDoc);
        });
    })
        .catch(function (err) {
        console.log("Error getting documents from " + collection, err);
    });
};
