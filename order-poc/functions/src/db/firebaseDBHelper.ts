
import * as admin from "firebase-admin";

const db = admin.database();

export const getOnce = async (path, limit = null) => {
    let snapshot;
    console.log("path to firebase DB" , path);
    if (limit) {
        snapshot = await db.ref(path).limitToLast(limit).once('value');
    } else {
        snapshot = await db.ref(path).once('value');
    }
    return await snapshot.val();
};
