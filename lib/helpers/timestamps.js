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
// export const fixTimestamps = (db: Firestore, collection: string, dateStrParam: string) => {
//     db.collection(collection).get().then(snapshot => {
//         snapshot.forEach(doc => {
//             if (typeof (doc.data()[dateStrParam]) == 'string') {
//                 console.log(`Found ${doc.id} with date ${doc.data()[dateStrParam]}`)
//                 const newDoc = doc.data();
//                 newDoc[dateStrParam] = dateStrToTimestamp(doc.data()[dateStrParam]);
//                 console.log(`Timestamp ${newDoc[dateStrParam]} generated for ${doc.id}`)
//                 db.collection(collection).doc(doc.id).set(newDoc);
//             }
//         })
//     })
//     .catch(err => {
//         console.log('Error getting documents', err);
//     });
// }
