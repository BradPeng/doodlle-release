import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useRef, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { db } from "../../firebase";
import Hints from "./Hints";
import Rating from "./rating";

const Guess = () => {
  const [doodlle, setDoodlle] = useState("");
  const [word, setWord] = useState("");
  const [inputWord, setInputWord] = useState("");
  const [doodlleLoaded, setDoodlleLoaded] = useState(false);
  const [hints, setHints] = useState([]);
  const [currentDrawing, setCurrentDrawing] = useState("");
  const ratingRef = useRef();

  const getImage = async () => {
    if (ratingRef.current) {
      ratingRef.current.reset();
    }
    let wordArr = await getAllWordsWithDrawings();
    let randomInt = Math.floor(Math.random() * wordArr.length);
    let randomWord = wordArr[randomInt];
    setWord(randomWord);

    const wordRef = doc(db, "words", randomWord);
    const wordSnapshot = await getDoc(wordRef);

    const numberOfDrawings = wordSnapshot.data().numberOfDrawings;
    const hints = wordSnapshot.data().hints;
    setHints(hints);

    const randomDrawingIndex = Math.floor(Math.random() * numberOfDrawings);

    const drawingsRef = collection(db, "words", randomWord, "drawings");
    const filteredQuery = query(
      drawingsRef,
      where("index", "==", randomDrawingIndex)
    );

    const querySnapshot = await getDocs(filteredQuery);
    setDoodlleLoaded(true);

    const data = querySnapshot.docs[0].data();
    setCurrentDrawing(querySnapshot.docs[0].id);
    setDoodlle(data.doodlleUrl);
  };

  const getAllWordsWithDrawings = async () => {
    const words = [];
    const wordsRef = collection(db, "words");

    const filteredQuery = query(wordsRef, where("numberOfDrawings", ">", 0));

    const snapshot = await getDocs(filteredQuery);
    snapshot.forEach((doc) => {
      words.push(doc.data().word);
    });
    return words;
  };

  const handleInputChange = (event) => {
    setInputWord(event.target.value);
  };

  const handleComparison = () => {
    if (inputWord.toLowerCase() === word.toLowerCase()) {
      alert("Words match!");
    } else {
      alert("Words do not match.");
    }
  };

  const revealWord = () => {
    alert("The word is " + word + "!");
  };

  return (
    <Container>
      <Row>
        <Col>
          <Button variant="success" onClick={getImage}>
            Get Image
          </Button>
        </Col>
      </Row>

      {doodlleLoaded && (
        <Row className="mt-3 g-0">
          <Col xxl={4} xl={4} lg={2} md={2} sm={1} xs={0}></Col>
          <Col xxl={4} xl={4} lg={6} md={5} sm={8} xs={8}>
            <Card className="position-relative">
              <div
                style={{
                  width: "100%",
                  maxWidth: "512px",
                  margin: "0 auto",
                  position: "relative",
                  paddingBottom: "100%",
                }}
              >
                <img
                  src={doodlle}
                  alt="Doodle"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
              <div
                className="position-absolute"
                style={{ top: "10px", right: "10px" }}
              >
                <Rating
                  ref={ratingRef}
                  word={word}
                  drawingId={currentDrawing}
                />
              </div>

              <Card.Body>
                <p>What is this Doodle?</p>
                <Form.Control
                  type="text"
                  placeholder="Type your guess here!"
                  value={inputWord}
                  onChange={handleInputChange}
                  className="mb-3"
                />
                <Button
                  variant="success"
                  onClick={handleComparison}
                  className="mr-2"
                >
                  Guess
                </Button>
                <Button variant="danger" onClick={revealWord}>
                  Give up
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col xxl={1} xl={1} lg={2} md={3} sm={2} xs={4}>
            <Hints hints={hints} />
          </Col>
          <Col xxl={3} xl={3} lg={2} md={2} sm={1} xs={0}></Col>
        </Row>
      )}
    </Container>
  );
};

export default Guess;
