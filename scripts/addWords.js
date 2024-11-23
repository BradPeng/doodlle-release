const admin = require("firebase-admin");

// CHANGE ME
const serviceAccount = require("./SOMEKEY.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const words = [
  // { word: "apple", hints: ["fruit", "red", "sweet"] },
  // { word: "elephant", hints: ["animal", "large", "trunk"] },
  // { word: "car", hints: ["vehicle", "transport", "wheels"] },
  { word: "volcano", hints: ["natural", "eruption", "mountain"] },
  { word: "piano", hints: ["instrument", "music", "keys"] },
  { word: "umbrella", hints: ["rain", "protection", "portable"] },
  { word: "butterfly", hints: ["insect", "colorful", "wings"] },
  { word: "library", hints: ["books", "quiet", "reading"] },
  { word: "chocolate", hints: ["sweet", "dessert", "cocoa"] },
  { word: "pyramid", hints: ["ancient", "Egypt", "tomb"] },
  { word: "sunflower", hints: ["flower", "yellow", "tall"] },
  { word: "computer", hints: ["technology", "internet", "device"] },
  { word: "mirror", hints: ["reflection", "glass", "frame"] },
  { word: "sweater", hints: ["clothing", "warm", "knit"] },
  { word: "dinosaur", hints: ["prehistoric", "extinct", "large"] },
  { word: "balloon", hints: ["air", "party", "float"] },
  { word: "kangaroo", hints: ["animal", "Australia", "jump"] },
  { word: "toothbrush", hints: ["hygiene", "teeth", "brushing"] },
  { word: "penguin", hints: ["bird", "cold", "Antarctica"] },
  { word: "guitar", hints: ["instrument", "music", "strings"] },
  { word: "telescope", hints: ["stargazing", "optical", "zoom"] },
  { word: "castle", hints: ["fortress", "medieval", "royalty"] },
  { word: "sandwich", hints: ["food", "layers", "bread"] },
  { word: "glacier", hints: ["ice", "cold", "moving"] },
  { word: "jacket", hints: ["clothing", "outerwear", "zipper"] },
  { word: "skateboard", hints: ["wheels", "sport", "tricks"] },
  { word: "magnet", hints: ["attraction", "metal", "poles"] },
  { word: "volleyball", hints: ["sport", "beach", "net"] },
  { word: "lantern", hints: ["light", "portable", "camping"] },
  { word: "parrot", hints: ["bird", "colorful", "talkative"] },
  { word: "submarine", hints: ["underwater", "vessel", "navy"] },
  { word: "firework", hints: ["explosion", "celebration", "sky"] },
  { word: "tunnel", hints: ["underground", "passage", "dark"] },
  { word: "coupon", hints: ["discount", "shopping", "savings"] },
  { word: "gymnasium", hints: ["sports", "indoor", "exercise"] },
  { word: "lighthouse", hints: ["beacon", "coastal", "navigation"] },
  { word: "microscope", hints: ["small", "science", "lens"] },
  { word: "puzzle", hints: ["pieces", "solve", "picture"] },
  { word: "quilt", hints: ["bedding", "warm", "patchwork"] },
  { word: "saxophone", hints: ["instrument", "music", "jazz"] },
  { word: "ocean", hints: ["water", "salt", "vast"] },
  { word: "helicopter", hints: ["flight", "rotor", "aircraft"] },
  { word: "cactus", hints: ["desert", "spiky", "plant"] },
  { word: "statue", hints: ["sculpture", "monument", "stone"] },
  { word: "igloo", hints: ["ice", "Eskimo", "shelter"] },
  { word: "flashlight", hints: ["dark", "portable", "battery"] },
  { word: "beehive", hints: ["honey", "bees", "wax"] },
  { word: "accordion", hints: ["music", "squeeze", "instrument"] },
  { word: "hamburger", hints: ["food", "fast", "bun"] },
  { word: "fountain", hints: ["water", "park", "spray"] },
  { word: "museum", hints: ["artifacts", "exhibits", "culture"] },
  { word: "windmill", hints: ["energy", "blades", "wind"] },
  { word: "tractor", hints: ["farm", "vehicle", "plow"] },
  { word: "pyjamas", hints: ["sleep", "clothing", "night"] },
  { word: "mosquito", hints: ["insect", "buzz", "bite"] },
  { word: "hedgehog", hints: ["spiny", "small", "animal"] },
  { word: "briefcase", hints: ["business", "carry", "documents"] },
  { word: "carousel", hints: ["ride", "horses", "round"] },
  { word: "spatula", hints: ["kitchen", "flip", "tool"] },
  { word: "monsoon", hints: ["rain", "season", "intense"] },
  { word: "chameleon", hints: ["lizard", "color change", "camouflage"] },
  { word: "ballet", hints: ["dance", "pointe shoes", "performance"] },
  { word: "jungle", hints: ["dense", "forest", "wildlife"] },
  { word: "xylophone", hints: ["musical", "instrument", "bars"] },
  { word: "harbor", hints: ["boats", "water", "shelter"] },
  { word: "recipe", hints: ["cooking", "instructions", "ingredients"] },
  { word: "avalanche", hints: ["snow", "mountain", "slide"] },
  { word: "origami", hints: ["paper", "folding", "art"] },
  { word: "kite", hints: ["fly", "wind", "string"] },
  { word: "sphinx", hints: ["Egypt", "mythical", "lion body"] },
  { word: "marathon", hints: ["race", "long distance", "running"] },
  { word: "easel", hints: ["painting", "stand", "artist"] },
  { word: "flute", hints: ["wind instrument", "music", "holes"] },
  { word: "lantern", hints: ["light", "portable", "night"] },
  { word: "yacht", hints: ["luxury", "boat", "sailing"] },
  { word: "quicksand", hints: ["sand", "trap", "sink"] },
  { word: "gargoyle", hints: ["statue", "gothic", "waterspout"] },
  { word: "toucan", hints: ["bird", "colorful beak", "tropical"] },
  { word: "amulet", hints: ["charm", "protection", "jewelry"] }
];

async function addWordsToFirestore(words) {
  const wordsRef = db.collection("words"); 

  const batch = db.batch();

  words.forEach((word) => {
    const wordRef = wordsRef.doc(word.word);
    batch.set(wordRef, {
      word: word.word,
      hints: word.hints,
    });
  });

  await batch.commit();
  console.log("Success");
}

addWordsToFirestore(words).catch(console.error);
