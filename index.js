const {FIREBASE_DATABASE_URL, FIREBASE_SERVICE_ACCOUNT} = require("./env");
const admin = require("firebase-admin");

admin.initializeApp({
    credential: admin.credential.cert(FIREBASE_SERVICE_ACCOUNT),
    databaseURL: FIREBASE_DATABASE_URL
})

const firebaseDatabase = admin.firestore();

// I needed a function to convert IFTTT's date string below with firestores built in Timestamp object
// January 1, 2020 at 12:00AM


const convertStringToTimeStamp = (db, dbName, stringParam) =>
    db.collection(dbName).get()
    .then(snapshot => {
        snapshot.forEach(doc => {
            if (typeof(doc.data()[stringParam]) == 'string') {
                console.log(`Found ${doc.id} with date ${doc.data()[stringParam]}`)
               const newDoc = doc.data();

               const originalDate = doc.data()[stringParam];
               const AMPM = originalDate.slice(-2);
               const trimmedDate = originalDate.substring(0, originalDate.length - 2).replace(" at", "");
               const clientDate = new Date(trimmedDate + " " + AMPM);
               newDoc[stringParam] = admin.firestore.Timestamp.fromDate(clientDate);
               db.collection(dbName).doc(doc.id).set(newDoc);
            }
        })
    })
    .catch(err => {
        console.log('Error getting documents', err);
      });

