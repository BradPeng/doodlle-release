const admin = require("firebase-admin");

// CHANGE ME
const serviceAccount = require("./SOMEKEY.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function deleteNonWordsCollections() {
  const collections = await db.listCollections();
  const promises = collections.map((collection) => {
    if (collection.id !== "words") {
      return deleteCollection(db, collection.id, 500); 
    }
  });

  await Promise.all(promises);
  console.log("All non-'words' collections have been deleted.");
}

async function deleteCollection(db, collectionPath, batchSize) {
  const collectionRef = db.collection(collectionPath);
  const query = collectionRef.orderBy("__name__").limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, resolve, reject);
  });
}

async function deleteQueryBatch(db, query, resolve, reject) {
  try {
    const snapshot = await query.get();

    if (snapshot.size === 0) {
      resolve();
      return;
    }

    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    process.nextTick(() => {
      deleteQueryBatch(db, query, resolve, reject);
    });
  } catch (error) {
    reject(error);
  }
}

deleteNonWordsCollections().catch(console.error);
