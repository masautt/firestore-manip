import { db } from "../admin";
import { dateObj_to_iftttDateStr, dateObj_to_firebaseTimestamp } from "./timestamps";

export const populate_iftttDateStrs = (collection : string, limit : number = 10, dateStrParam : string = "occuredAt") => {
    const epochs = genEpochs(limit);
    console.log(`Generated ${limit} documents with dateStrParamm ${dateStrParam}`)
    epochs.map(epoch => {
        const name = Math.random().toString(36).slice(2);
        const date = dateObj_to_iftttDateStr(new Date(epoch));
        db.collection(collection).add({
            [dateStrParam] : date,
            name : name,
            sSID : "yea"
        }).then(ref => {
            console.log(`Added document ${ref.id} with name ${name} and date ${date}`);
        })
    })
}

export const populate_FirebaseTimestamps = (collection : string, limit : number, dateStrParam : string) => {
    const epochs = genEpochs(limit);
    epochs.map(epoch => {
        db.collection(collection).add({
            [dateStrParam] : dateObj_to_firebaseTimestamp(new Date(epoch)),
            name : Math.random().toString(36).slice(2)
        })
    })
}


export const genEpochs = (limit :number = 10) : Array<number> => {
    const dates: Array<number> = [];
    const epochSize = Math.pow(10,13);
    Array.from({length: limit}, () => {
        dates.push(Math.floor(epochSize + Math.random() * (epochSize * 9)));
    })
    return dates;
}



