
module.exports.fixTimestamps = (db, dbName, dateStrParam) =>
    db.collection(dbName).get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                if (typeof (doc.data()[stringParam]) == 'string') {
                    console.log(`Found ${doc.id} with date ${doc.data()[stringParam]}`)
                    const newDoc = doc.data();
                    newDoc[stringParam] = dateStrToTimestamp(doc.data()[stringParam]);
                    console.log(`Timestamp ${newDoc[stringParam]} generated for ${doc.id}`)
                    db.collection(dbName).doc(doc.id).set(newDoc);
                }
            })
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });

module.exports.dateStrToTimestamp = (dateStr) => {
    const originalDate = dateStr;
    const AMPM = originalDate.slice(-2);
    const trimmedDate = originalDate.substring(0, originalDate.length - 2).replace(" at", "");
    const clientDate = new Date(trimmedDate + " " + AMPM);
    return (admin.firestore.Timestamp.fromDate(clientDate));
}