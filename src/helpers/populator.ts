import { Firestore } from "@google-cloud/firestore";

export const populateIFTTTDateStrs = (db : Firestore, collection : string, limit : number) => {

}

export const genEpochs = (limit :number = 10) : Array<Number> => {
    const dates: Array<Number> = [];
    Array.from({length: limit}, () => {
        dates.push(Math.floor(Math.pow(10,13) + Math.random() * (9 * Math.pow(10,13))));
    })
    return dates;
}



export const populateFirebaseTimestamps = (db : Firestore, collection : string, limit : number) => {
    
}