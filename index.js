const {FIREBASE_DATABASE_URL, FIREBASE_SERVICE_ACCOUNT} = require("./env");
const admin = require("firebase-admin");

admin.initializeApp({
    credential: admin.credential.cert(FIREBASE_SERVICE_ACCOUNT),
    databaseURL: FIREBASE_DATABASE_URL
})

const firebaseDatabase = admin.firestore();
//test collection
//8l2y30RPgtXwjppAQeJm --> January 1, 2020 at 11:29AM
//dbdTVrHuD55e2Xt6HLF7 --> January 1, 2020 at 11:29AM
//pKSqnWF8bpmSbBijbv0f --> TimeStamp for Jan 1st at 00:00


firebaseDatabase.collection("test-collection").get()
    .then(snapshot => {
        snapshot.forEach(doc => {
            if (typeof(doc.data()["OccuredAt"]) == 'string') {
               console.log(`This document has a date that is a string`)
               console.log(doc.data()["OccuredAt"])
            }
        })
    })
    .catch(err => {
        console.log('Error getting documents', err);
      });