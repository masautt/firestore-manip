import { Firestore } from "@google-cloud/firestore";

export const deleteDocByKeyVal = (db : Firestore, collection : string, key : any, val : any) => 
    db.collection(collection).where(key, '==', val).get()
        .then(snapshot  => snapshot.forEach(doc => {
            console.log(`FOUND doc ${doc.id} with key/val {${key}:${val}} in ${collection}`)
            db.collection(collection).doc(doc.id).delete()
                .then(() =>  console.log(`DELETED Doc ${doc.id} with key/val {${key}:${val}} in ${collection}`))
                .catch((err) => console.log(`ERROR occured trying to delete Doc ${doc.id} from  ${collection}\n${err}`))
            }))

export const deleteDocByID = (db : Firestore, collection : string, docId : string) => 
    db.collection(collection).doc(docId).delete()
        .then(() =>  console.log(`DELETED Doc ${docId} in ${collection}`))
        .catch((err) => console.log(`ERROR occured trying to delete Doc ${docId} from  ${collection}\n${err}`))

export const deleteAllDocs = (db : Firestore, collection : string) => 
    db.collection(collection).get()
        .then(snapshot  => snapshot.forEach(doc => 
            db.collection(collection).doc(doc.id).delete()
                .then(() =>  console.log(`DELETED Doc ${doc.id} in ${collection}`))
                .catch((err) => console.log(`ERROR occured trying to delete Doc ${doc.id} from  ${collection}\n${err}`))))

export const copyDocByKeyVal = (db: Firestore, collection1 : string, collection2: string, key: any, val : any) => {
    db.collection(collection1).where(key, '==', val).get()
        .then(snapshot => snapshot.forEach(doc => {
            const newDoc = doc.data();
            console.log(`Doc with id ${doc.id} found with key/val {${key}:${val}} in ${collection1}`)
            db.collection(collection2).doc(doc.id).set(newDoc)
                .then(() =>  console.log(`Doc with id ${doc.id} and key/val {${key}:${val}} moved from ${collection1} to ${collection2}`))
                .catch((err) => console.log(`ERROR occured trying to move Doc ${doc.id} with key/val {${key}:${val}} from ${collection1} to ${collection2}\n${err}`))
            }))}



