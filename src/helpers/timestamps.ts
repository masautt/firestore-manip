import { Timestamp, Firestore } from "@google-cloud/firestore";
import * as admin from "firebase-admin";

export const iftttDateStr_to_firebaseTimestamp = (dateStr: string) : Timestamp => {
    const ampm = dateStr.slice(-2);
    const cleanDateStr = dateStr.substring(0, dateStr.length - 2).replace(" at", "");
    const clientDate = new Date(cleanDateStr + " " + ampm);
    return (admin.firestore.Timestamp.fromDate(clientDate));
}

export const dateObj_to_firebaseTimestamp = (date : Date) : Timestamp => admin.firestore.Timestamp.fromDate(date);

export const dateObj_to_iftttDateStr = (date : Date) : string => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours() === 0 ? 12 : date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    const ampm = date.getHours() >= 12 ? "PM" : "AM";
    const iftttDateStr = `${month} ${day}, ${year} at ${hours}:${minutes}${ampm}`;
    return iftttDateStr;

}

export const replace_iftttDateStrParam_with_firebaseTimestampParam = (db: Firestore, inputCollection: string, outputCollection: string, dateStrParam: string) => {
    db.collection(inputCollection).get().then(snapshot => {
        snapshot.forEach(doc => {
            if (typeof (doc.data()[dateStrParam]) == 'string') {
                const newDoc = doc.data();
                newDoc[dateStrParam] = iftttDateStr_to_firebaseTimestamp(doc.data()[dateStrParam])
                db.collection(outputCollection).doc(doc.id).set(newDoc);
            }
        })
    })
    .catch(err => {
        console.log(`Error getting documents from ${inputCollection}`, err);
    });
}

export const add_iftttDateStrParam = (db: Firestore, collection:string, dateStrParam:string) => {
    db.collection(collection).get().then(snapshot => {
        snapshot.forEach(doc => {
            const newDoc = doc.data();
            newDoc[dateStrParam] = dateObj_to_iftttDateStr(new Date());
            db.collection(collection).doc(doc.id).set(newDoc);
            }
        )
    })
    .catch(err => {
        console.log(`Error getting documents from ${collection}`, err);
    });
}

export const add_firebaseTimestampParam = (db: Firestore, collection:string, dateStrParam:string) => {
    db.collection(collection).get().then(snapshot => {
        snapshot.forEach(doc => {
            const newDoc = doc.data();
            newDoc[dateStrParam] = admin.firestore.Timestamp.fromDate(new Date());
            db.collection(collection).doc(doc.id).set(newDoc);
            }
        )
    })
    .catch(err => {
        console.log(`Error getting documents from ${collection}`, err);
    });
}