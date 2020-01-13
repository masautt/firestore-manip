import { Firestore } from "@google-cloud/firestore";

export const getDoc = (db : Firestore, collection : string, docKey : any, docVal? : any) => {
    db.collection(collection).where(docKey, '==', docVal).get()
        .then(snapshot => {
            snapshot.forEach(doc => {
               
            })
        })
}

export const moveDoc = (db: Firestore, collection1 : string, collection2: string, docKey: any, docVal? : any) => {
    db.collection(collection1).where(docKey, '==', docVal).get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                console.log(doc.data().OccuredAt._seconds);
            })
        })
}