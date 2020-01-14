import * as admin from "firebase-admin";
import {FIREBASE_DATABASE_URL, FIREBASE_SERVICE_ACCOUNT } from "./env";
import { populate_iftttDateStrs} from "./helpers/populate";
import { deleteAllDocs } from "./helpers/docs";


admin.initializeApp({
    credential: admin.credential.cert(FIREBASE_SERVICE_ACCOUNT),
    databaseURL: FIREBASE_DATABASE_URL
})

const firebaseDatabase = admin.firestore();

//populate_iftttDateStrs(firebaseDatabase, "date-str-examples", 10, "OccuredAt");

deleteAllDocs(firebaseDatabase, "date-str-examples");