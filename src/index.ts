import * as admin from "firebase-admin";
import {FIREBASE_DATABASE_URL, FIREBASE_SERVICE_ACCOUNT } from "./env";
import {dateObj_to_iftttDateStr, iftttDateStr_to_firebaseTimestamp} from "./helpers/timestamps";
import {genEpochs} from "./helpers/populator";

admin.initializeApp({
    credential: admin.credential.cert(FIREBASE_SERVICE_ACCOUNT),
    databaseURL: FIREBASE_DATABASE_URL
})

const firebaseDatabase = admin.firestore();

console.log(genEpochs(12));

console.log(dateObj_to_iftttDateStr(new Date(20925407282800)));

console.log(iftttDateStr_to_firebaseTimestamp(dateObj_to_iftttDateStr(new Date(20925407282800))));


