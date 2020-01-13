module.exports.getDoc = (db, dbName, docKey, docVal) => {
    db.collection(dbName).where(docKey, '==', docVal).get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                console.log(doc.data().OccuredAt._seconds);
            })
        })
}

module.exports.moveDoc = (db, dbName1, dbName2, docKey, docValue) => {
    db.collection(dbName).where(docKey, '==', docVal).get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                console.log(doc.data().OccuredAt._seconds);
            })
        })
}