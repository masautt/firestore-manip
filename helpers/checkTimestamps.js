const timestampParams = ["OccuredAt", "SunriseAt", "SunsetAt", "CreatedAt", "FellAsleepAt", "AwokeAt"]

module.exports.checkTimestamp = (db, dbName) =>
    db.collection(dbName)
        .get()
        .then((doc) => {
            const temp = [];
            const response = data.forEach((doc) => {
                temp.push(doc.data())
            })
            return temp;
        }
        ).then((temp)=> console.log(temp))