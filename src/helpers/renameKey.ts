import { db } from "../admin";

export const renameKey = (collection : string, fromKey : string, toKey : string) => 
    db.collection(collection).get()
        .then(snapshot => snapshot.forEach(doc => {
                let tempItem = doc.data();
                let tempItemId = doc.id;
                if (keysContainStr(tempItem, fromKey)) {
                    let newItem = makeContainStr(tempItem, fromKey, toKey);
                    console.log(`Found item ${tempItemId} with key ${fromKey} in ${collection}`);
                    db.collection(collection).doc(tempItemId).delete()
                        .then(() => db.collection(collection).doc(tempItemId).set(newItem))
                        .then(() => console.log(`Item ${tempItemId} with key ${tempItem} in ${collection} has been changed to ${toKey}`))
                }
            })
        )

const keysContainStr = (body : any, str : string) => {
    let containsStr = false;
    Object.keys(body).forEach(key => {
        if (key === str) containsStr = true;
    })
    return containsStr;
}

const makeContainStr = (body: any, fromKey : string, toKey : string) => {
    Object.keys(body).map(key => {
        if (key === fromKey) {
            body[toKey] = body[key];
            delete body[key];
        }
    })
    return body;
}