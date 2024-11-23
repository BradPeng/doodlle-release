const admin = require("firebase-admin");
const fs = require("fs");
const { createObjectCsvWriter } = require("csv-writer");

// CHANGE ME
const serviceAccount = require("./SOMEKEY.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const outputFilePath = "doodle_data.csv";

const csvWriter = createObjectCsvWriter({
  path: outputFilePath,
  header: [
    { id: "word", title: "Word" },
    { id: "doodlleUrl", title: "Drawing URL" },
    { id: "likes", title: "Likes" },
    { id: "dislikes", title: "Dislikes" },
  ],
});

async function exportWordsToCSV() {
  try {
    const wordsRef = db.collection("words");
    const wordsSnapshot = await wordsRef.get();

    const records = [];

    for (const wordDoc of wordsSnapshot.docs) {
      const wordData = wordDoc.data();
      const word = wordData.word;

      const drawingsRef = wordDoc.ref.collection("drawings");
      const drawingsSnapshot = await drawingsRef.get();

      drawingsSnapshot.forEach(drawingDoc => {
        const drawingData = drawingDoc.data();
        records.push({
          word: word,
          doodlleUrl: drawingData.doodlleUrl || "",
          likes: drawingData.likes || 0,
          dislikes: drawingData.dislikes || 0,
        });
      });
    }

    await csvWriter.writeRecords(records);
    console.log(`exported to: ${outputFilePath}`);
  } catch (error) {
    console.error("Error exporting data to CSV:", error);
  }
}

exportWordsToCSV();
