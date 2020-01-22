import * as admin from "firebase-admin";
import { FIREBASE_DATABASE_URL, FIREBASE_SERVICE_ACCOUNT } from "./env";
import { Firestore } from "@google-cloud/firestore";


admin.initializeApp({
    credential: admin.credential.cert(FIREBASE_SERVICE_ACCOUNT),
    databaseURL: FIREBASE_DATABASE_URL
})

export const db : Firestore = admin.firestore();