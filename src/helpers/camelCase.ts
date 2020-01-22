import { db } from "../admin";

export const makeCollectionCamelCase = (collection : string) => 
    db.collection(collection).get()
        .then(snapshot => snapshot.forEach(doc => {
                let tempItem = doc.data();
                let tempItemId = doc.id;
                if (!isKeysCamelCase(tempItem)) {
                    let newItem = makeKeysCamelCase(tempItem);
                    console.log(`Found item ${tempItemId} with data ${tempItem} in ${collection}`);
                    db.collection(collection).doc(tempItemId).delete()
                        .then(() => db.collection(collection).doc(tempItemId).set(newItem))
                        .then(() => console.log(`Item ${tempItemId} with data ${tempItem} in ${collection} has been camelCased`))
                }}))

const makeKeysCamelCase = (body : any) => {
    Object.keys(body).forEach(key => {
        body[makeStrCamelCase(key)] = body[key];
        delete body[key];
    })
    return body;
}

const isKeysCamelCase = (body : any) => {
    let isCamelCase = true;
    Object.keys(body).forEach(key => {
        if (!isStrCamelCase(key)) isCamelCase = false;
    })
    return isCamelCase;
}

const makeStrCamelCase = (str : string) => `${str.charAt(0).toLowerCase() + str.slice(1)}`
const isStrCamelCase = (str : string) => str.charAt(0) === str.charAt(0).toLowerCase();