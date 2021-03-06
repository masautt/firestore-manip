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
admin.initializeApp({
    credential: admin.credential.cert(env_1.FIREBASE_SERVICE_ACCOUNT),
    databaseURL: env_1.FIREBASE_DATABASE_URL
});
exports.db = admin.firestore();
