"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var admin = __importStar(require("firebase-admin"));
var env_1 = require("./env");
var timestamps_1 = require("./helpers/timestamps");
var populator_1 = require("./helpers/populator");
admin.initializeApp({
    credential: admin.credential.cert(env_1.FIREBASE_SERVICE_ACCOUNT),
    databaseURL: env_1.FIREBASE_DATABASE_URL
});
var firebaseDatabase = admin.firestore();
console.log(populator_1.genEpochs(12));
console.log(timestamps_1.dateObj_to_iftttDateStr(new Date(20925407282800)));
console.log(timestamps_1.iftttDateStr_to_firebaseTimestamp(timestamps_1.dateObj_to_iftttDateStr(new Date(20925407282800))));
