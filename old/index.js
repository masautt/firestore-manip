const { FIREBASE_DATABASE_URL, FIREBASE_SERVICE_ACCOUNT } = require("./env");
const admin = require("firebase-admin");

admin.initializeApp({
    credential: admin.credential.cert(FIREBASE_SERVICE_ACCOUNT),
    databaseURL: FIREBASE_DATABASE_URL
})

const firebaseDatabase = admin.firestore();
