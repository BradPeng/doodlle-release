import {
  addDoc,
  collection,
  doc,
  getDoc,
  increment,
  updateDoc
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { BsFillEraserFill, BsPencilFill } from "react-icons/bs";
import { FaRedoAlt, FaUndoAlt } from "react-icons/fa";
import { db, storage } from "../../firebase";
import { getRandomWord } from "./draw";

const blueButtonStyles = {
  flex: 1,
};

function base64ToBlob(base64, contentType) {
  const byteString = atob(base64.split(",")[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: contentType });
}

const DrawingToolBar = ({
  sketchRef,
  handleCursorSizeChange,
  cursorSize,
  word,
  setWord,
}) => {
  const submitDoodlle = async (e) => {
    e.preventDefault();
    sketchRef.current.exportImage("png").then(async (data) => {
      const imageBlob = base64ToBlob(data, "image/png");

      const timestamp = new Date();
      const formattedTimestamp = timestamp
        .toISOString()
        .replace(/:/g, "-")
        .replace(/\./g, "-");
      const storageRef = ref(
        storage,
        `doodles/${word}/${formattedTimestamp}_${word}.png`
      );

      const snapshot = await uploadBytes(storageRef, imageBlob);
      const imageUrl = await getDownloadURL(snapshot.ref);

      const wordRef = doc(db, "words", word); 
      const drawingsRef = collection(wordRef, "drawings");
      const wordSnapshot = await getDoc(wordRef);
      let numberOfDrawings = 0;
      if (wordSnapshot.exists()) {
        numberOfDrawings = wordSnapshot.data().numberOfDrawings || 0; 
      }

      await addDoc(drawingsRef, {
        word: word,
        doodlleUrl: imageUrl,
        createdAt: timestamp,
        dislikes: 0,
        likes: 0,
        index: numberOfDrawings,
      });

      await updateDoc(wordRef, {
        numberOfDrawings: increment(1),
      });
    });

    sketchRef.current.clearCanvas();
    alert("Your doodle has been successfully submitted");

    setWord(await getRandomWord());
  };

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        maxWidth: "512px",
      }}
    >
      <Form.Range
        style={{ marginTop: "10px", marginBottom: "10px", color: "green" }}
        min={1}
        value={cursorSize}
        max={30}
        step={1}
        onChange={handleCursorSizeChange}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <Button
          style={blueButtonStyles}
          onClick={() => sketchRef.current.eraseMode(false)}
        >
          <BsPencilFill />
        </Button>
        <Button
          style={blueButtonStyles}
          onClick={() => sketchRef.current.eraseMode(true)}
        >
          <BsFillEraserFill />
        </Button>
        <Button
          style={blueButtonStyles}
          onClick={() => sketchRef.current.undo()}
        >
          <FaUndoAlt />
        </Button>
        <Button
          style={blueButtonStyles}
          onClick={() => sketchRef.current.redo()}
        >
          <FaRedoAlt />
        </Button>
      </div>
      <Button variant="danger" onClick={() => sketchRef.current.clearCanvas()}>
        Clear
      </Button>

      <Button
        variant="success"
        type="submit"
        className="btn"
        onClick={submitDoodlle}
      >
        Submit Doodlle
      </Button>
    </Container>
  );
};

export default DrawingToolBar;
